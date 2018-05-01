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
      const menu = {
        menuName: req.body.menuName,
        date: req.body.date,
        meals: [req.body.meals],
      };
      menus.push(menu);
      res.status(201).json({ menu, message: 'menu added successfully' });
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
    if (menus.length === 0) {
      res.status(404).json({ error: 'no menu found' });
    }
    res.status(200).json({
      menus
    });
  }
}
export default MenuController;
