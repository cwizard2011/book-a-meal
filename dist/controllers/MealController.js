'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    req.checkBody('mealId', 'id is required').notEmpty().trim();
    req.checkBody('mealName', 'Meal name is required').notEmpty().trim();
    req.checkBody('price', 'Price of meal is required').notEmpty().trim();
    req.checkBody('description', 'Meal description is required').notEmpty().trim();
    req.checkBody('mealAvatar', 'Image of meal is required').notEmpty().trim();

    const requestErrors = req.validationErrors();

    if (requestErrors) {
      res.status(400).json({
        errors: requestErrors
      });
    } else {
      const meal = {
        mealId: req.body.mealId,
        mealName: req.body.mealName,
        price: req.body.price,
        description: req.body.description,
        mealAvatar: req.body.mealAvatar
      };
      const filterMeal = req.meals.filter(check => check.mealName === req.body.mealName || check.mealId === req.body.mealId);
      if (filterMeal.length === 0) {
        req.meals.push(meal);
        res.status(201).json({ meal });
      } else {
        return res.status(400).send({ message: 'Meal or this Meal Id already exist' });
      }
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
      meals: req.meals
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
      res.sendStatus(404);
    } else {
      existingMeal.mealName = req.body.mealName;
      existingMeal.price = req.body.price;
      existingMeal.description = req.body.description;
      existingMeal.mealAvatar = req.body.mealAvatar;
      res.sendStatus(204);
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
      return res.sendStatus(404);
    }
    req.meals = req.meals.splice(currentMeal, 1);
    res.sendStatus(204);
  }
}

exports.default = MealController;
//# sourceMappingURL=MealController.js.map