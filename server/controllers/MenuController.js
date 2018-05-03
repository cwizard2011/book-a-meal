import Menu from '../services/Menu';
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
    req.checkBody('menuName', 'Menu name is required').notEmpty().isString().trim();

    const requestErrors = req.validationErrors();

    if (requestErrors) {
      res.status(400).json({
        errors: requestErrors,
      });
    } else {
      req.sanitizeBody('menuName').escape();
      const { menuName, userId } = req.body;
      Menu.postMenu(menuName, userId, () => {
        res.status(201).json({
          message: 'Menu created', 
          menu: {
            menuName,
            userId
          }
        });
      });
    }
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
    try {
      if (menus.length === 0) {
        res.status(404).json({ error: 'no menu found' });
      }
      res.status(200).json({
        menus
      });
    } catch (error) {
      res.status(500).json({ error: 'server error' });
    }
  }
}
export default MenuController;
