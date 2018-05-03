import database from '../models';

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
 * @param {Number} userId the id of the creator
 * @param {Function} done callback
 *
 * @return {Object} insertedData
 */
  static postMenu(menuName, meal, userId, done) {
    const users = Users.findAll({
      where: {
        userId,
        role: 'admin',
      },
    }).then((user) => {
      done(user);
    }).catch((err) => {
      done({ err });
    });
    if (!users) {
      return done({ err: 'Only Caterers are allowed to post menu' });
    }
    return Menus.findOrCreate({
      where: {
        menuName,
      },
      defaults: {
        userId,
      }
    }).then((menu) => {
      done(menu);
    }).catch((err) => {
      done({ err });
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
