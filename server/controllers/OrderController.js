import orders from '../data/orders';
/** @class OrderController
 *
 */
class OrderController {
  /**
   * Create a new order
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static createOrders(req, res) {
    try {
      req.checkBody('orderId', 'Order id is required').notEmpty().trim();
      req.checkBody('customerId', 'Customer Id is required').notEmpty().trim();
      req.checkBody('mealName', 'Name of meal is required').notEmpty().isString().trim();
      req.checkBody('total', 'Order total is required').notEmpty().trim();

      const requestErrors = req.validationErrors();

      if (requestErrors) {
        res.status(400).json({
          errors: requestErrors,
        });
      } else {
        const {
          orderId,
          customerId,
          mealName,
          total,
        } = req.body;

        const order = {
          orderId,
          customerId,
          mealName,
          total,
        };
        const filterOrder = orders.filter(check =>
          check.orderId === req.body.orderId && check.customerId === req.body.customerId);
        if (filterOrder.length === 0) {
          orders.push(order);
          res.status(201).json({ order, message: 'Order created successfully' });
        } else {
          return res.status(409).send({ message: 'Order already exist' });
        }
      }
    } catch (error) {
      res.status(500).json({ error: 'server error' });
    }
  }

  /**
   * get order
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static getOrders(req, res) {
    try {
      if (orders.length === 0) {
        res.status(404).json({ error: 'no order found' });
      }
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ error: 'server error' });
    }
  }
  /**
   * Edit current order
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static editOrder(req, res) {
    try {
      const orderId = parseInt(req.params.orderId, 10);
      const existingOrder = orders.filter(edit => edit.orderId === orderId)[0];

      if (!existingOrder) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        existingOrder.mealName = req.body.mealName;
        existingOrder.total = req.body.total;
        res.status(200).json({ existingOrder, message: 'Order edited successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'server error' });
    }
  }
}

export default OrderController;
