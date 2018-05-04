import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';


import User from '../services/User';
import Validation from '../helpers/Validation';
import Authentication from '../helpers/Authentication';

dotenv.config();
const salt = bcrypt.genSaltSync(10);

/**
 * class User: controls all user routes
 *
 * @class
 */
export default class UserControllers {
  /**
 * @description: controls a user's registration
 * through route POST: api/v1/user/signup
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the registered user
 */
  static signUp(req, res) {
    const {
      username,
      password,
      email,
      role,
      phoneNumber
    } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (/^[a-zA-Z]{8,30}$/.test(username) === false) {
      res.status(400).json({ message: 'Username should contain only letters and must have between 8-30 characters' });
    } else if (/^[0-9]{11,}$/.test(phoneNumber) === false) {
      res.status(400).json({ message: 'Phone number should not contain letters and should be valid' });
    } else {
      User.findUser(username, (checkedUser) => {
        if (checkedUser.length !== 0) {
          res.status(409).json({
            message: 'You already have an existing account. Kindly go and login'
          });
        } else {
          User.createUser(username, hashedPassword, email, role, phoneNumber, (users) => {
            if (users instanceof Object && users.dataValues !== undefined) {
              res.status(201).json({
                message: 'Registration successful',
                user: {
                  id: users.id,
                  username: users.username,
                  email: users.email,
                  role: users.role,
                }
              });
            } else if (typeof users === 'string') {
              res.status(400).json({ message: users });
            } else {
              res.status(500).json({ message: 'Sorry, an unexpected error occurred' });
            }
          });
        }
      });
    }
  }

  /**
 * @description: controls a user's login through route POST: api/user/signin
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the logged-in user
 */
  static signIn(req, res) {
    const { username, password } = req.body;
    User.findUser(username, (users) => {
      if (users.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else if (bcrypt.compareSync(password, users[0].password)) {
        const token = Authentication.createToken({
          username: users[0].username,
          id: users[0].id
        });
        res.status(200).json({
          message: 'You are now logged in',
          user: {
            id: users[0].id,
            username: users[0].username,
            email: users[0].email,
            token
          }
        });
      } else {
        res.status(401).json({ message: 'Incorrect password' });
      }
      if (Validation.hasInternalServerError(users)) {
        res.status(500).json(Validation.sendInternalServerError());
      }
    });
  }
}

