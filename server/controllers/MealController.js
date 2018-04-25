
class MealController {
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
        req.meals.push(meal);
        res.status(201).json({ meal });
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }
  static getMeal(req, res) {
    res.status(200).json({
      meals: req.meals,
    });
  }
  static getMealId(req, res) {
    try {
      const id = req.params;
      const meals = req.meals.find(meal => meal.id === id).meal;
      if (meals) {
        res.status(200).json({ meals });
      }
    } catch (error) {
      res.status(404).json({
        error: 'Meal not found',
      });
    }
  }
}

export default MealController;
