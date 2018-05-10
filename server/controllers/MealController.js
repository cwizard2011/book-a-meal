import moment from 'moment';
import Sequelize from 'sequelize';
import database from '../models';

const validationError = Sequelize.ValidationError;
const Meals = database.Meal;
const Users = database.User;
const Menus = database.Menu;
/**
 * @class MealController
 */
class MealController {
  /**
   * Create a new meal
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static createMeals(req, res) {
    const {
      mealName,
      description,
      userId,
      mealAvatar,
      price,
      menuId,
    } = req.body;
    Users.findOne({
      where: {
        id: userId
      }
    }).then((user) => {
      if (user) {
        return Menus.findOne({
          where: {
            id: menuId
          }
        }).then((menu) => {
          if (menu) {
            return Meals.create({
              mealName,
              description,
              userId,
              mealAvatar,
              price,
              menuId,
              expires: moment().add(5, 'minutes')
            }).then((meals) => {
              res.status(201).json({
                message: 'Meal created',
                meals: {
                  id: meals.id,
                  mealName,
                  userId,
                  mealAvatar,
                  price,
                  description,
                  menuId,
                  expires: meals.expires
                }
              });
            });
          }
          res.status(404).json({ message: 'Menu not found' });
        });
      }
      res.status(404).json({ message: 'User not found' });
    }).catch((err) => {
      if (err instanceof validationError) {
        if (err.errors[0].message === 'mealName must be unique') {
          res.status(400).json({ message: 'meal already existing' });
        } else if (err.errors[0].message === '') {
          res.status(400).json({ message: `${err.errors[0]} must be supplied` });
        } else {
          res.status(400).json({ message: err.errors[0].message });
        }
      }
    });
  }

  /**
   * get meal
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static getMeals(req, res) {
    Meals.findAll().then((meals) => {
      if (meals.length === 0) {
        res.status(404).json({ message: 'No meal in the database, Please preapare a meal' });
      } else {
        res.status(200).json({
          message: 'Meal found', meals
        });
      }
    }).catch(() => {
      res.status(500).json({ message: 'Oops! My bad, something at my end' });
    });
  }
  /**
   * get meal by id
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static getMealById(req, res) {
    const mealId = req.params.id;
    Meals.findById(mealId)
      .then((meals) => {
        if (!meals) {
          res.status(404).json({ message: 'Can\'t get meal, meal not in database' });
        } else {
          res.status(200).json({
            message: 'Meal found', meals
          });
        }
      }).catch(() => {
        res.status(500).json({ message: 'Oops! My bad, something wrong at my end' });
      });
  }
  /**
   * Edit meals by Id
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
  */
  static editMeal(req, res) {
    const { id } = req.params;
    const {
      mealName,
      description,
      mealAvatar,
      price,
    } = req.body;
    Meals.update(
      {
        mealName,
        description,
        mealAvatar,
        price
      },
      { returning: true, where: { id } }
    )
      .then(([rows, [updatedMeal]]) => {
        if (!rows || !updatedMeal) {
          res.status(404).send({ message: 'Can\'t update meal, Meal not found in the database' });
        } else {
          res.status(200).send({ message: 'update succesful', rows, updatedMeal });
        }
      }).catch(() => {
        res.status(500).send({ message: 'Oops! My bad, something at my end' });
      });
  }
  /**
   * delete meals by Id
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
  */
  static removeMeal(req, res) {
    const { id } = req.params;
    Meals.destroy({
      where: { id }
    }).then((deletedMeal) => {
      if (!deletedMeal) {
        res.status(400).json({ message: 'Can\'t delete meal, Meal not found in the database' });
      } else {
        res.status(200).json({ message: 'meal deleted successfully', deletedMeal });
      }
    }).catch(() => {
      res.status(500).json({ message: 'Oops! My bad, something at my end' });
    });
  }
}

export default MealController;
