// import menus from '../data/menus';
/**
 * @class MealController
 */
class MenuController {
  static createMenu(req, res) {
    const menu = {
      id: req.body.id,
      menuName: req.body.menuName,
      date: new Date().now,
      meals: [
        {
          meal_id: req.body.meal_id,
          name: req.body.name,
          description: req.body.description,
          image: req.body.image,
          price: req.body.price,
        },
      ],
    };
    req.menus.push(menu);
    res.status(201).json({ menu });
  }
  // static getMeals(req, res) {

  // }
}
export default MenuController;
