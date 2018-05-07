import moment from 'moment';
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
      total,
      mealId
    } = req.body;
    Orders.create({
      mealName,
      userId,
      total,
      mealId,
      expires: moment().add(2, 'hours'),
      date: moment()
    }).then((order) => {
      if (order instanceof Object && order.dataValues !== undefined) {
        res.status(201).json({
          message: 'Order created',
          order: {
            id: order.id,
            mealId,
            mealName,
            userId,
            total,
          }
        });
      }
    }).catch(() => {
      res.status(500).send({ message: 'Oops! My bad, something at my end' });
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
      if (orders.length === 0) {
        res.status(404).json({ message: 'No order in the database for now, please check later' });
      } else {
        res.status(200).json({
          message: 'Order found', orders
        });
      }
    }).catch(() => {
      res.status(500).send({ message: 'Oops! My bad, something at my end' });
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
        if (!rows || !updatedOrder) {
          res.status(404).send({ message: 'Can\'t update order, Order not found in the database' });
        } else if (moment().isAfter(updatedOrder.expires)) {
          res.status(406).json({ message: 'Sorry you cant edit this order again, it has expires' });
        } else {
          res.status(200).json({ message: 'update succesful', rows, updatedOrder });
        }
      }).catch(() => {
        res.status(500).send({ message: 'Oops! My bad, something at my end' });
      });
  }
}

export default OrderController;
