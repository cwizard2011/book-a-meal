import MealController from '../controllers/MealController';
import storedMeals from '../middleware/mealMiddleware';

const mealRoutes = (versionURL, app) => {
  app.get(`${versionURL}/meals`, MealController.getMeals);
  app.get(`${versionURL}/meals/:mealId`, MealController.getMealById);
  app.post(`${versionURL}/meals`, storedMeals, MealController.createMeals);
  app.put(`${versionURL}/meals/:mealId`, MealController.editMeal);
  app.delete(`${versionURL}/meals/:mealId`, storedMeals, MealController.removeMeal);
};

export default mealRoutes;
