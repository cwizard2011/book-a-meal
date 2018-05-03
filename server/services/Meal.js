import database from '../models';

const Meals = database.Meal;
const Users = database.User;

/**
 * class Meal: interracts with the Meal table
 * @class
 */
export default class Meal {
  /**
 * @description: save meal to database
 *
 * @param {Number} userId the id of the user
 * @param {String} mealName the name of the meal
 * @param {String} description the description of the meal
 * @param {String} mealAvatar the image link of the meal
 * @param {String} price the price of the meal
 * @param {Function} done callback
 *
 * @return {Object} insertedData
 */
  static createMeal(userId, mealName, description, mealAvatar, price, done) {
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
      return done({ err: 'Only Caterers are allowed to post meal' });
    }
    return Meals.findOrCreate({
      where: {
        mealName,
        description,
        mealAvatar,
        price,
      },
      defaults: {
        userId,
      }
    }).then((meal) => {
      done(meal);
    }).catch((err) => {
      done({ err });
    });
  }


  /**
 * @description: get meals by user
 *
 * @param {Number} userId the id of the user
 * @param {Function} done callback
 *
 * @return {Object} retrievedData
 */
  static getMeals(userId, done) {
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
      return done({ err: 'Only Caterers are allowed to get meal' });
    }
    Meals.findAll({
      where: {
        id: userId
      }
    }).then((group) => {
      done(group);
    }).catch((err) => {
      done({ err });
    });
  }
  /**
 * @description: delete a meals by mealid
 * @param {Number} userId id of the user
 * @param {Number} mealId id of the meal to delete
 * @param {Function} done callback
 *
 * @return {Object} deletedData
 */
  static deleteMeal(userId, mealId, done) {
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
      return done({ err: 'Only caterers is allowed to delete meal' });
    }
    Meals.destroy({
      where: {
        id: mealId
      }
    }).then((msg) => {
      done(msg);
    }).catch((err) => {
      done({ err });
    });
  }
  /**
 * @description: update a meal by id
 * @param {Number} userId id of the admin
 * @param {Number} mealId id of the meal to update
 * @param {Function} done callback
 *
 * @return {Object} updatedData
 */
  static updateMeal(userId, mealId, done) {
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
      return done({ err: 'Only admin are allowed to update meal' });
    }
    Meals.update({
      where: {
        id: mealId
      }
    }).then((msg) => {
      done(msg);
    }).catch((err) => {
      done({ err });
    });
  }
}
