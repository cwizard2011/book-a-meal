import Sequelize from 'sequelize';

import database from '../models';

const validationError = Sequelize.ValidationError;
const Users = database.User;
/**
 * class User: interracts with User table in the database
 * @class
 */
class User {
  /**
 * @description: saves user to database
 *
 * @param {String} username username of the user
 * @param {String} password password of the user
 * @param {String} email email of the user
 * @param {String} role role of the user admin/user
 * @param {String} phoneNumber phone number of the user
 * @param {Function} done callback function
 *
 * @return {Object} savedData
 */
  static createUser(username, password, email, role, phoneNumber, done) {
    return Users.create({
      username,
      password,
      email,
      role,
      phoneNumber
    }).then((user) => {
      done(user);
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
 * @description: find a user using the username
 *
 * @param {String} userName username of the user
 * @param {Function} done callback function
 *
 * @return {Object} userData
 */
  static findUser(userName, done) {
    return Users.findAll({
      where: {
        username: { $iLike: userName }
      }
    }).then((user) => {
      done(user);
    });
  }
}

export default User;
