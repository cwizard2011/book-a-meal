import database from '../models';

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
      id,
      menuName,
      meals,
      userId
    } = req.body;
    Menus.create({
      id,
      menuName,
      meals,
      userId
    }).then((menus) => {
      res.status(201).json({
        message: 'Menu created',
        menu: {
          id: menus.id,
          menuName: menus.menuName,
          meals: menus.meals,
          userId: menus.userId
        }
      });
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
      res.status(200).json({
        message: 'Menu found', menus
      });
    });
  }
}
export default MenuController;
