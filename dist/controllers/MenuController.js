'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// import menus from '../data/menus';
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
  static createMenu(req, res) {
    try {
      req.checkBody('menuName', 'Menu name is required').notEmpty().trim();
      req.checkBody('meals', 'Meals on menu are required').notEmpty().trim();
      req.checkBody('date', 'Date of menu is required').notEmpty().trim();

      const requestErrors = req.validationErrors();

      if (requestErrors) {
        res.status(400).json({
          errors: requestErrors
        });
      } else {
        if (typeof req.body.menuName !== 'string') {
          res.sendStatus(404);
        }
        req.sanitizeBody('menuName').escape();
        const menu = {
          menuName: req.body.menuName,
          date: req.body.date,
          meals: [req.body.meals]
        };
        req.menus.push(menu);
        res.status(201).json({ menu });
      }
    } catch (error) {
      res.sendStatus(500);
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
  static getMenu(req, res) {
    res.status(200).json({
      menus: req.menus
    });
  }
}
exports.default = MenuController;
//# sourceMappingURL=MenuController.js.map