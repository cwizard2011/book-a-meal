'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
  static createOrder(req, res) {
    req.checkBody('orderId', 'Order id is required').notEmpty().trim();
    req.checkBody('customerId', 'Customer Id is required').notEmpty().trim();
    req.checkBody('mealName', 'Name of meal is required').notEmpty().trim();
    req.checkBody('total', 'Order total is required').notEmpty().trim();

    const requestErrors = req.validationErrors();

    if (requestErrors) {
      res.status(400).json({
        errors: requestErrors
      });
    } else {
      const order = {
        orderId: req.body.orderId,
        customerId: req.body.customerId,
        mealName: req.body.mealName,
        total: req.body.total
      };
      const filterOrder = req.orders.filter(check => check.orderId === req.body.orderId && check.customerId === req.body.customerId);
      if (filterOrder.length === 0) {
        req.orders.push(order);
        res.status(201).json({ order });
      } else {
        return res.status(400).send({ message: 'Order already exist' });
      }
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
  static getOrder(req, res) {
    res.status(200).json({
      orders: req.orders
    });
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
    const orderId = parseInt(req.params.orderId, 10);
    const existingOrder = req.orders.filter(edit => edit.orderId === orderId)[0];

    if (!existingOrder) {
      res.sendStatus(404);
    } else {
      existingOrder.mealName = req.body.mealName;
      existingOrder.total = req.body.total;
      res.sendStatus(204);
    }
  }
}

exports.default = OrderController;
//# sourceMappingURL=OrderController.js.map