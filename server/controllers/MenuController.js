// import menus from '../data/menus';
/**
 * @class MealController
 */
class MenuController {
  static createMenu(req, res) {
    try {
      req.checkBody('menuName', 'Menu name is required').notEmpty().trim();
      req.checkBody('meals', 'Meals on menu are required').notEmpty().trim();
      req.checkBody('date', 'Date of menu is required').notEmpty().trim();

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
        req.menus.push(menu);
        res.status(201).json({ menu });
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }
  static getMenu(req, res) {
    res.status(200).json({
      menus: req.menus,
    });
  }
}
export default MenuController;
