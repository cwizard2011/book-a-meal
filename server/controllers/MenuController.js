import moment from 'moment';
import Sequelize from 'sequelize';
import database from '../models';

const validationError = Sequelize.ValidationError;

const Menus = database.Menu;
const Users = database.User;

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
      userId,
    } = req.body;
   
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
