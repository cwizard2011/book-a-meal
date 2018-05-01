import meals from '../data/meals';
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
  static createMeals(req, res) {
    try {
      req.checkBody('mealId', 'id is required').notEmpty().trim();
      req.checkBody('mealName', 'Meal name is required').notEmpty().isString().trim();
      req.checkBody('price', 'Price of meal is required').notEmpty().isString().trim();
      req.checkBody('description', 'Meal description is required').notEmpty().isString().trim();
      req.checkBody('mealAvatar', 'Image of meal is required').notEmpty().trim();

      const requestErrors = req.validationErrors();

      if (requestErrors) {
        res.status(400).json({
          errors: requestErrors,
        });
      } else {
        const meal = {
          mealId: req.body.mealId,
          mealName: req.body.mealName,
          price: req.body.price,
          description: req.body.description,
          mealAvatar: req.body.mealAvatar,
        };
        const filterMeal = meals.filter(check =>
          check.mealName === req.body.mealName || check.mealId === req.body.mealId);
        if (filterMeal.length === 0) {
          meals.push(meal);
          res.status(201).json({ meal });
        } else {
          return res.status(409).send({ message: 'Meal or this Meal Id already exist' });
        }
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
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
  static getMeals(req, res) {
    if (meals.length === 0) {
      res.status(404).json({ error: 'no meals found' });
    }
    res.status(200).json({ meals });
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
  static getMealById(req, res) {
    const mealId = parseInt(req.params.mealId, 10);
    const result = meals.filter(m => m.mealId === mealId)[0];

    if (!result) {
      res.status(404).json({ error: 'Meal not found' });
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
    const existingMeal = meals.filter(edit => edit.mealId === mealId)[0];

    if (!existingMeal) {
      res.status(404).json({ error: 'meal not found' });
    } else {
      existingMeal.price = req.body.price;
      res.status(200).json({ existingMeal, message: ' price of meal edited successfully' });
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
  static removeMeal(req, res) {
    const mealId = parseInt(req.params.mealId, 10);
    const currentMeal = req.meals.filter(check => check.mealId === mealId)[0];

    if (!currentMeal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    req.meals = req.meals.splice(currentMeal, 1);
    res.status(200).json({ currentMeal, message: 'meals deleted successfully' });
  }
}

export default MealController;
