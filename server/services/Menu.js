import Sequelize from 'sequelize';
import database from '../models';

const validationError = Sequelize.ValidationError;

const Menus = database.Menu;
const Meals = database.Meal;
const Users = database.User;

/**
 * class Menu: interracts with the Menu table in the database
 * @class
 */
export default class Menu {
  /**
 * @description: saves menu to database
 *
 * @param {String} menuName the name of the menu
 * @param {String} meal the name of the meal
 * @param {Number} userId the id of the user
 * @param {Function} done callback
 *
 * @return {Object} insertedData
 */
  static postMenu(menuName, meal, userId, done) {
    return Menus.create({
      menuName,
      meal,
      userId
    }).then((menu) => {
      done(menu);
    }).catch((err) => {
      if (err instanceof validationError) {
        if (err.errors[0].message === 'email must be unique') {
          done('email already existing');
        } else if (err.errors[0].message === '') {
          done(`${err.errors[0].path} must be supplied`);
        } else {
          done(err.errors[0].message);
        }
      } else {
        done({ err });
      }
    });
  }

  /**
 * @description: retrieves menu by name
 *
 * @param {Number} menuName name of the menu to get
 * @param {Function} done callback function
 *
 * @return {Object} retrievedData
 */
  static getMenu(menuName, done) {
    Menus.findAll({ where: { menuName } }).then((menu) => {
      done(menu);
    }).catch((err) => {
      done({ err });
    });
  }
  /**
 * @description: retrieves all meals in a menu
 *
 * @param {Number} menuId id of the menu for meals
 * @param {Function} done callback function
 *
 * @return {Object} retrievedData
 */
  static getMenuMeals(menuId, done) {
    Menu.findOne({
      where: { id: menuId },
      include: [{
        model: Meals,
        as: 'meals'
      }]
    }).then((data) => {
      done(data);
    }).catch((err) => {
      done({ err });
    });
  }
}
