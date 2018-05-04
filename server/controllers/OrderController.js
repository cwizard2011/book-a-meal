import database from '../models';

const Orders = database.Order;
/** @class MealController
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
    const {
      mealName,
      userId,
      total
    } = req.body;
    Orders.create({
      mealName,
      userId,
      total
    }).then((order) => {
      res.status(201).json({
        message: 'Order created',
        order: {
          id: order.id,
          mealName: order.mealName,
          userId: order.userId,
          total: order.total
        }
      });
    });
  }

  /**
   * get orders
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static getOrders(req, res) {
    Orders.findAll().then((orders) => {
      res.status(200).json({
        message: 'Order found', orders
      });
    });
  }
  /**
   *Edit order by Id
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
  */
  static editOrder(req, res) {
    const { id } = req.params;
    const {
      mealName,
      total,
    } = req.body;
    Orders.update(
      {
        mealName,
        total
      },
      { returning: true, where: { id } }
    )
      .then(([rows, [updatedOrder]]) => {
        res.status(200).json({ message: 'update succesful', rows, updatedOrder });
      });
  }
}

export default OrderController;
