import MealController from '../controllers/MealController';
import Validation from '../helpers/Validation';
import Authentication from '../helpers/Authentication';
import isAdmin from '../helpers/isAdmin';


const mealRoutes = (versionURL, app) => {
  app.get(`${versionURL}/meals`, Authentication.verifyToken, isAdmin, MealController.getMeals);
  app.get(`${versionURL}/meals/:id`, Authentication.verifyToken, isAdmin, MealController.getMealById);
  app.post(`${versionURL}/meals`, Authentication.verifyToken, isAdmin, Validation.checkMealDetails, MealController.createMeals);
  app.put(`${versionURL}/meals/:id`, Authentication.verifyToken, isAdmin, Validation.checkMealDetails, MealController.editMeal);
  app.delete(`${versionURL}/meals/:id`, Authentication.verifyToken, isAdmin, MealController.removeMeal);
};

export default mealRoutes;
