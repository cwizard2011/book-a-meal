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
      userId,
    } = req.body;

    if (menuName === undefined) {
      return res.status(400).json({ message: 'menu Name cannot be empty, please enter menu name' });
    } else if (userId === undefined) {
      return res.status(400).json({ message: 'user id cannot be empty, please enter user id' });
    } else if (Number.isNaN(parseInt(userId, 10))) {
      return res.status(400).json({ message: 'User Id must be a number' });
    } else if (!Number.isNaN(parseInt(menuName, 10))) {
      return res.status(400).json({ message: 'menu name must be alphabetical' });
    } else if (menuName.trim().length > 20) {
      return res.status(400).json({ message: 'length of meal too long, please shorten it' });
    }
    return next();
  }
  /**
 * @description: validates the meal details
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
      menuId
    } = req.body;

    if (description === undefined || description.trim().length === 0) {
      return res.status(400).json({ message: 'description cannot be empty, please enter description' });
    } else if (mealName === undefined || mealName.trim().length === 0) {
      return res.status(400).json({ message: 'Meal name cannot be empty, please enter a meal name' });
    } else if (mealAvatar === undefined || mealAvatar.trim().length === 0) {
      return res.status(400).json({ message: 'meal Avatar cannot be empty, please upload image' });
    } else if (/^[0-9]$/.test(price) === false) {
      res.status(400).json({ message: 'Price should only contain digits, please enter a valid price' });
    } else if (userId === undefined || userId.trim().length === 0) {
      return res.status(400).json({ message: 'userId cannot be empty, please enter user id' });
    } else if (menuId === undefined || menuId.trim().length === 0) {
      return res.status(400).json({ message: 'menuId cannot be empty, please enter user id' });
    } else if (Number.isNaN(parseInt(userId, 10))) {
      return res.status(400).json({ message: 'User Id must be a number' });
    } else if (Number.isNaN(parseInt(menuId, 10))) {
      return res.status(400).json({ message: 'Menu Id must be a number' });
    } else if (!Number.isNaN(parseInt(mealAvatar, 10))) {
      return res.status(400).json({ message: 'meal avatar must be string' });
    } else if (!Number.isNaN(parseInt(description, 10))) {
      return res.status(400).json({ message: 'description must be string' });
    } else if (mealName.trim().length > 20) {
      return res.status(400).json({ message: 'meal name is too long, please shorten it to 20 characters including spaces' });
    } else if (description.trim().length > 100) {
      return res.status(400).json({ message: 'description is too long, please shorten it to 100 characters' });
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
      mealId,
      userId,
      total,
    } = req.body;

    if (total === undefined || total.trim().length === 0) {
      return res.status(400).json({ message: 'total cannot be empty, please enter total' });
    } else if (userId === undefined) {
      return res.status(400).json({ message: 'userId cannot be empty, please enter user id' });
    } else if (Number.isNaN(parseInt(userId, 10))) {
      return res.status(400).json({ message: 'User Id must be a number' });
    } else if (Number.isNaN(parseInt(userId, 10))) {
      return res.status(400).json({ message: 'User Id must be a number' });
    } else if (mealId === undefined) {
      return res.status(400).json({ message: 'meal id cannot be empty, please enter meal id' });
    } else if (Number.isNaN(parseInt(mealId, 10))) {
      return res.status(400).json({ message: 'meal id Id must be a number' });
    }
    return next();
  }
}
