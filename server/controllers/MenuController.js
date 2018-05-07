import moment from 'moment';
import Sequelize from 'sequelize';
import database from '../models';

const validationError = Sequelize.ValidationError;

const Menus = database.Menu;

/**
 * @class MenuController
 */
class MenuController {
  /**
   * Create a new menu
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static createMenus(req, res) {
    const {
      menuName,
      meals,
      userId,
    } = req.body;
    Menus.create({
      menuName,
      meals,
      userId,
      date: moment()
    }).then((menus) => {
      if (menus instanceof Object && menus.dataValues !== undefined) {
        res.status(201).json({
          message: 'Menu created',
          menu: {
            id: menus.id,
            menuName,
            meals,
            userId,
            date: menus.date,
          }
        });
      } else if (typeof menus === 'string') {
        res.status(400).json({ message: menus });
      } else {
        res.status(500).json({ message: 'Sorry, an unexpected error occured' });
      }
    }).catch((err) => {
      if (err instanceof validationError) {
        if (err.errors[0].message === 'menuName must be unique') {
          res.status(400).json({ message: 'menu name already existing' });
        } else if (err.errors[0].message === '') {
          res.status(400).json({ message: `${err.errors[0]} must be supplied` });
        } else {
          res.status(400).json({ message: err.errors[0].message });
        }
      } else {
        res.json({ err });
      }
    });
  }
  /**
   * Get menu
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static getMenus(req, res) {
    Menus.findAll().then((menus) => {
      if (menus.length === 0) {
        res.status(404).json({ message: 'No menu in the database, please add menu' });
      } else {
        res.status(200).json({
          message: 'Menu found', menus
        });
      }
    }).catch(() => {
      res.status(500).json({ message: 'Oops! Server broke down' });
    });
  }
}
export default MenuController;
