
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
   * get meal
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
   * get meal by id
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static getMealId(req, res) {
    const mealId = parseInt(req.params.mealId, 10);
    const result = req.meals.filter(m => m.mealId === mealId)[0];

    if (!result) {
      res.sendStatus(404);
    } else {
      res.send(result);
    }
  }
  /**
   *Edit meals by Id
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
  */
  static editMeal(req, res) {
    const mealId = parseInt(req.params.mealId, 10);
    const existingMeal = req.meals.filter(edit => edit.mealId === mealId)[0];

    if (!existingMeal) {
      const meal = req.body;
      meal.mealId = mealId;
      req.meals.push(meal);
      res.setHeader(`Location, /api/v1/ ${mealId}`);
      res.sendStatus(201);
    } else {
      existingMeal.mealName = req.body.mealName;
      existingMeal.price = req.body.price;
      existingMeal.description = req.body.description;
      res.sendStatus(204);
    }
  }
}

export default MealController;
