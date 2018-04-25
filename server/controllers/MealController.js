import meals from '../data/meals';
class MealController {
  static getMeal(req, res){
    res.status(200).json({
      meals: req.meals,
    });
  }
  static getMealById(req, res) {
    const id = req.params
    console.log(meal);
    if (meal){
      res.status(200).json({meal})
    }
  }
  static createMeal(req, res){
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
          mealAvatar: req.body.mealAvatar
        };
        req.meals.push(meal);
        res.status(201).json({ meal });
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }
  }

export default MealController;