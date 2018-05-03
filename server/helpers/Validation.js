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
 * @description: validates user's password
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
      /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{5,12}$/.test(password) === false) {
      return res.status(400).json({
        message: 'Password must be alphanumeric and should contain 5-12 characters'
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
