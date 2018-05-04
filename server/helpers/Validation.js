/**
 * @description: validates the supplied req.body for each route
 *
 * @class Validation
 */
export default class Validation {
  /**
 * @description: validates the userId
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the validation status
 */
  static checkUserId(req, res, next) {
    const userId = req.params.userID;
    if (userId === undefined) {
      return res.status(400).json({ message: 'userId must be supplied' });
    } else if (userId.trim().length === 0) {
      return res.status(400).json({ message: 'userId cannot be empty' });
    } else if (Number.isNaN(parseInt(userId, 10))) {
      return res.status(400).json({ message: 'The supplied id must be integer' });
    }
    return next();
  }
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
    const { password, role } = req.body;
    if (password === undefined) {
      return res.status(400).json({ message: 'Password must be supplied' });
    } else if (
      /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{6,30}$/.test(password) === false) {
      return res.status(400).json({
        message: 'Password must be alphanumeric and should contain 6-30 characters'
      });
    } else if (role === undefined) {
      return res.status(400).json({ message: 'Role of the user must be assigned' });
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
    const { menuName, meals, userId } = req.body;
    const parameters = { menuName, meals, userId };
    const validationErrors = [];
    const reqBodyKeys = Object.keys(req.body);
    Object.keys(parameters).forEach((params) => {
      if (reqBodyKeys.indexOf(params) === -1) {
        validationErrors.push(params);
      }
    });
    if (validationErrors.length > 0) {
      return res.status(400).json({ message: `${validationErrors[0]} must be supplied` });
    } else if (menuName.trim().length === 0) {
      return res.status(400).json({ message: 'menuName cannot be empty' });
    } else if (meals.trim().length === 0) {
      return res.status(400).json({ message: 'meal cannot be empty' });
    } else if (Number.isNaN(parseInt(userId, 10))) {
      return res.status(400).json({ message: 'User Id must be a number' });
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
    const parameters = {
      mealName,
      description,
      userId,
      mealAvatar,
      price,
    };
    const validationErrors = [];
    const reqBodyKeys = Object.keys(req.body);
    Object.keys(parameters).forEach((params) => {
      if (reqBodyKeys.indexOf(params) === -1) {
        validationErrors.push(params);
      }
    });
    if (validationErrors.length > 0) {
      return res.status(400).json({ message: `${validationErrors[0]} must be supplied` });
    } else if (mealName.trim().length === 0) {
      return res.status(400).json({ message: 'mealName cannot be empty' });
    } else if (description.trim().length === 0) {
      return res.status(400).json({ message: 'description cannot be empty' });
    } else if (mealAvatar.trim().length === 0) {
      return res.status(400).json({ message: 'meal Avatar cannot be empty' });
    } else if (price.trim().length === 0) {
      return res.status(400).json({ message: 'price cannot be empty' });
    } else if (userId.trim().length === 0) {
      return res.status(400).json({ message: 'userId cannot be empty' });
    } else if (description.trim().length === 0) {
      return res.status(400).json({ message: 'description cannot be empty' });
    } else if (Number.isNaN(parseInt(userId, 10))) {
      return res.status(400).json({ message: 'User Id must be a number' });
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
      userId,
      total,
    } = req.body;
    const parameters = {
      mealName,
      userId,
      total,
    };
    const validationErrors = [];
    const reqBodyKeys = Object.keys(req.body);
    Object.keys(parameters).forEach((params) => {
      if (reqBodyKeys.indexOf(params) === -1) {
        validationErrors.push(params);
      }
    });
    if (validationErrors.length > 0) {
      return res.status(400).json({ message: `${validationErrors[0]} must be supplied` });
    } else if (mealName.trim().length === 0) {
      return res.status(400).json({ message: 'mealName cannot be empty' });
    } else if (total.trim().length === 0) {
      return res.status(400).json({ message: 'total cannot be empty' });
    } else if (userId.trim().length === 0) {
      return res.status(400).json({ message: 'userId cannot be empty' });
    } else if (Number.isNaN(parseInt(userId, 10))) {
      return res.status(400).json({ message: 'User Id must be a number' });
    }
    return next();
  }


  /**
 * @description: checks for internal server error from services
 *
 * @param {Object} dbResponse response from services
 *
 * @return {Object} response object
 */
  static hasInternalServerError(dbResponse) {
    if (dbResponse instanceof Object && !Array.isArray(dbResponse)
      && dbResponse.dataValues === undefined) {
      return true;
    }
  }

  /**
  * @description: sends response for internal server error
  *
  * @return {Object} response object
  */
  static sendInternalServerError() {
    return ({ message: 'Sorry, unexpected error occurred' });
  }
}
