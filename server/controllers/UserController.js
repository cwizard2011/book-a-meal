import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';


import User from '../services/User';
import Authentication from '../helpers/Authentication';

dotenv.config();
const salt = bcrypt.genSaltSync(10);

/**
 * class User: controls all user routes
 *
 * @class
 */
class UserControllers {
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
      firstName,
      lastName,
      password,
      email,
      role,
      phoneNumber
    } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (/^[a-zA-Z][a-zA-Z0-9]{3,10}$/.test(username) === false) {
      res.status(400).json({ message: 'Invalid username, username can only be a min. of 3 and max of 10 alphanumeric characters starting with letters' });
    } else if (username === undefined) {
      res.status(400).json({ message: 'You must provide a username' });
    } else if (firstName === undefined) {
      res.status(400).json({ message: 'You must provide your first Name' });
    } else if (lastName === undefined) {
      res.status(400).json({ message: 'You must provide your last Name' });
    } else if (firstName.length > 20 || lastName.length > 20) {
      res.status(400).json({ message: 'Name too long, please restrict name to 20 characters including spaces' });
    } else if (/^[A-Za-z]+$/.test(firstName) === false || /^[A-Za-z]+$/.test(lastName) === false) {
      res.status(400).json({ message: 'Invalid Name, name can only contain alphabets' });
    } else if (phoneNumber === undefined) {
      res.status(400).json({ message: 'You must provide mobile number' });
    } else if (email === undefined) {
      res.status(400).json({ message: 'You must provide an email address' });
    } else if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) === false) {
      res.status(400).json({ message: 'invalid email, please enter correct email' });
    } else if (/^[0-9]{11,}$/.test(phoneNumber) === false) {
      res.status(400).json({ message: 'Phone number should not contain letters and should be valid' });
    } else {
      User.findUser(username, (checkedUser) => {
        if (checkedUser.length !== 0) {
          res.status(409).json({
            message: 'You already have an existing account. Kindly go and login'
          });
        } else {
          User.createUser(
            username, firstName, lastName, hashedPassword, email, role, phoneNumber,
            (users) => {
              if (users instanceof Object && users.dataValues !== undefined) {
                res.status(201).json({
                  message: 'Registration successful',
                  user: {
                    id: users.id,
                    username,
                    firstName,
                    lastName,
                    email,
                    role
                  }
                });
              } else if (typeof users === 'string') {
                res.status(400).json({ message: users });
              } else {
                res.status(500).json({ message: 'Sorry, an unexpected error occurred' });
              }
            }
          );
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
          id: users[0].id,
          role: users[0].role
        });
        res.status(200).json({
          message: 'You are now logged in',
          user: {
            id: users[0].id,
            username: users[0].username,
            email: users[0].email,
            role: users[0].role,
            token
          }
        });
      } else {
        res.status(401).json({ message: 'username or password incorrect' });
      }
    });
  }
}
export default UserControllers;
