
/** @class MealController
 *
 */
class MealController {
  /**
   * Create a new meal
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static createMeal(req, res) {
    try {
      req.checkBody('id', 'id is required').notEmpty().trim();
      req.checkBody('mealName', 'Meal name is required').notEmpty().trim();
      req.checkBody('price', 'Price of meal is required').notEmpty().trim();
      req.checkBody('description', 'Meal description is required').notEmpty().trim();
      req.checkBody('mealAvatar', 'Image of meal is required').notEmpty().trim();

      const requestErrors = req.validationErrors();

      if (requestErrors) {
        res.status(400).json({
          errors: requestErrors,
        });
      } else {
        req.sanitizeBody('mealName').escape();
        const meal = {
          id: req.body.id,
          mealName: req.body.mealName,
          price: req.body.price,
          description: req.body.description,
          mealAvatar: req.body.mealAvatar,
        };
        const filterMeal = req.meals.filter(check =>
          check.mealName === req.body.mealName || check.id === req.body.id);
        if (filterMeal.length === 0) {
          req.meals.push(meal);
          res.status(201).json({ meal });
        } else {
          return res.status(400).send({ message: 'Meal already exist' });
        }
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }

  /**
   * Create a new meal
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static getMeal(req, res) {
    res.status(200).json({
      meals: req.meals,
    });
  }
  /**
   * Create a new meal
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static getMealId(req, res) {
    const { id } = req.params.id;
    const result = req.meals.filter(meal => meal.id === id)[0];

    if (result) {
      res.sendStatus(200).json({ result: res.result });
    } else {
      res.sendStatus(404);
    }
  }
}

export default MealController;
