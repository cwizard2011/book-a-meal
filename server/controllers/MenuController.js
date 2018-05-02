import menus from '../data/menus';
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
    try {
      req.checkBody('menuName', 'Menu name is required').notEmpty().isString().trim();
      req.checkBody('meals', 'Meals on menu are required').notEmpty().isArray().trim();
      req.checkBody('date', 'Date of menu is required').notEmpty().isString().trim();

      const requestErrors = req.validationErrors();

      if (requestErrors) {
        res.status(400).json({
          errors: requestErrors,
        });
      } else {
        req.sanitizeBody('menuName').escape();
        const {
          menuName,
          date,
          meals,
        } = req.body;

        const menu = {
          menuName,
          date,
          meals,
        };

        menus.push(menu);
        res.status(201).json({ menu, message: 'menu added successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'server error' });
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
