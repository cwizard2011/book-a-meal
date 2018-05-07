/**
 * @description: validates the supplied req.body for each route
 *
 * @class Validation
 */
export default class Validation {
  /**
 * @description: validates user's password and role of the user
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the validation status
 */
  static checkPassword(req, res, next) {
    const { password } = req.body;
    if (password === undefined) {
      return res.status(400).json({ message: 'Password must be supplied' });
    } else if (
      /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{8,}$/.test(password) === false) {
      return res.status(400).json({
        message: 'Password must be alphanumeric and should contain a minimum of 8 characters'
      });
    }
    return next();
  }


  /**
  * @description: validates both username and password
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @param {Function} next callback function
  *
  * @return {Object} response containing the validation status
*/
  static checkUser(req, res, next) {
    const { username, password } = req.body;
    const parameters = { username, password };
    const validationErrors = [];
    const reqBodyKeys = Object.keys(req.body);
    Object.keys(parameters).forEach((params) => {
      if (reqBodyKeys.indexOf(params) === -1) {
        validationErrors.push(params);
      }
    });
    if (validationErrors.length > 0) {
      return res.status(400).json({ message: `${validationErrors[0]} must be supplied` });
    }
    return next();
  }
  /**
 * @description: validates the menu details
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the validation status
 */
  static checkMenuDetails(req, res, next) {
    const {
      menuName,
      meals,
      userId,
    } = req.body;

    if (menuName === undefined) {
      return res.status(400).json({ message: 'menu Name cannot be empty, please enter menu name' });
    } else if (meals === undefined) {
      return res.status(400).json({ message: 'meal cannot be empty, please enter meals' });
    } else if (userId === undefined) {
      return res.status(400).json({ message: 'user id cannot be empty, please enter user id' });
    } else if (Number.isNaN(parseInt(userId, 10))) {
      return res.status(400).json({ message: 'User Id must be a number' });
    } else if (!Number.isNaN(parseInt(menuName, 10))) {
      return res.status(400).json({ message: 'menu name must be alphabetical' });
    } else if (!Array.isArray(meals)) {
      return res.status(400).json({ message: 'meals must be in array' });
    }
    for (let i = 0; i < meals.length; i += 1) {
      if (meals[i].trim().length === 0) {
        return res.status(400).json({ message: 'meal cannot be empty, please enter meals' });
      }
    }
    return next();
  }
  /**
 * @description: validates the menu details
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the validation status
 */
  static checkMealDetails(req, res, next) {
    const {
      mealName,
      description,
      userId,
      mealAvatar,
      price,
    } = req.body;

    if (mealName === undefined || mealName.trim().length === 0) {
      return res.status(400).json({ message: 'meal Name cannot be empty, please enter meal name' });
    } else if (description === undefined || description.trim().length === 0) {
      return res.status(400).json({ message: 'description cannot be empty, please enter description' });
    } else if (mealAvatar === undefined || mealAvatar.trim().length === 0) {
      return res.status(400).json({ message: 'meal Avatar cannot be empty, please upload image' });
    } else if (price === undefined || price.trim().length === 0) {
      return res.status(400).json({ message: 'price cannot be empty, please enter meal price' });
    } else if (userId === undefined || userId.trim().length === 0) {
      return res.status(400).json({ message: 'userId cannot be empty, please enter user id' });
    } else if (Number.isNaN(parseInt(userId, 10))) {
      return res.status(400).json({ message: 'User Id must be a number' });
    } else if (!Number.isNaN(parseInt(mealName, 10))) {
      return res.status(400).json({ message: 'meal name must be string' });
    } else if (!Number.isNaN(parseInt(mealAvatar, 10))) {
      return res.status(400).json({ message: 'meal avatar must be string' });
    } else if (!Number.isNaN(parseInt(description, 10))) {
      return res.status(400).json({ message: 'description must be string' });
    }
    return next();
  }
  /**
 * @description: validates the menu details
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the validation status
 */
  static checkOrderDetails(req, res, next) {
    const {
      mealName,
      mealId,
      userId,
      total,
    } = req.body;

    if (mealName === undefined || mealName.trim().length === 0) {
      return res.status(400).json({ message: 'meal Name cannot be empty, please enter meal name' });
    } else if (total === undefined || total.trim().length === 0) {
      return res.status(400).json({ message: 'total cannot be empty, please enter total' });
    } else if (userId === undefined) {
      return res.status(400).json({ message: 'userId cannot be empty, please enter user id' });
    } else if (Number.isNaN(parseInt(userId, 10))) {
      return res.status(400).json({ message: 'User Id must be a number' });
    } else if (mealId === undefined) {
      return res.status(400).json({ message: 'meal id cannot be empty, please enter meal id' });
    } else if (Number.isNaN(parseInt(mealId, 10))) {
      return res.status(400).json({ message: 'meal id Id must be a number' });
    } else if (!Number.isNaN(parseInt(mealName, 10))) {
      return res.status(400).json({ message: 'meal name must be string' });
    }
    return next();
  }
}
