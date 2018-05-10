import moment from 'moment';
import database from '../models';


const Orders = database.Order;
const Meals = database.Meal;
const Users = database.User;
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
      userId,
      total,
      mealId,
    } = req.body;
    Users.findOne({
      where: { id: userId }
    }).then((user) => {
      if (user) {
        return Meals.findOne({
          where: { id: mealId }
        }).then((meal) => {
          if (meal) {
            return Meals.findOne({
              where: { expires: meal.expires }
            }).then((meals) => {
              if (moment().isAfter(meals.expires)) {
                res.status(406).json({ message: 'Sorry you can\'t place order, meal has expires' });
              } else {
                return Orders.findOne({
                  where: { mealId: mealId }
                }).then((order) => {
                  if (!order) {
                    return Orders.create({
                      userId,
                      total,
                      mealId,
                      expires: moment().add(2, 'minutes'),
                    }).then((orders) => {
                      if (orders instanceof Object && orders.dataValues !== undefined) {
                        res.status(201).json({
                          message: 'Order created',
                          order: {
                            id: orders.id,
                            mealId,
                            userId,
                            total,
                            expires: orders.expires
                          }
                        });
                      }
                    }).catch(() => {
                      res.status(500).json({ message: 'Oops! My bad, something at my end' });
                    });
                  }
                  res.status(409).json({ message: 'sorry, can\'t post order, order already exist' });
                });
              }
            });
          }
          res.status(404).json({ message: 'Sorry, meal not found' });
        });
      }
      res.status(404).json({ message: 'Sorry, user not found' });
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
  /**
   * delete order by Id
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
  */
  static removeOrder(req, res) {
    const { id } = req.params;
    Orders.destroy({
      where: { id }
    }).then((deletedOrder) => {
      if (!deletedOrder) {
        res.status(400).json({ message: 'Can\'t delete meal, Meal not found in the database' });
      } else {
        res.status(200).json({ message: 'meal deleted successfully', deletedOrder });
      }
    }).catch(() => {
      res.status(500).json({ message: 'Oops! My bad, something at my end' });
    });
  }
}

export default OrderController;
