// import menus from '../data/menus';
/**
 * @class MealController
 */
class MenuController {
  static createMenu(req, res) {
    try {
      req.checkBody('id', 'Id is required').notEmpty().trim();
      req.checkBody('menuName', 'Menu name is required').notEmpty().trim();
      req.checkBody('mealId', 'Meal id is required').notEmpty().trim();
      req.checkBody('mealName', 'Name of meal is required').notEmpty().trim();
      req.checkBody('price', 'Price of meal is required').notEmpty().trim();
      req.checkBody('description', 'Meal description is required').notEmpty().trim();
      req.checkBody('date', 'Date of menu is required').notEmpty().trim();

      const requestErrors = req.validationErrors();

      if (requestErrors) {
        res.status(400).json({
          errors: requestErrors,
        });
      } else {
        req.sanitizeBody('id').escape();


        const menu = {
          id: req.body.id,
          menuName: req.body.menuName,
          date: req.body.date,
          meals: [
            {
              mealId: req.body.mealId,
              mealName: req.body.mealName,
              description: req.body.description,
              image: req.body.image,
              price: req.body.price,
            },
          ],
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
