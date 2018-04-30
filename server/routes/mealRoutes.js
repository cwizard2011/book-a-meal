import MealController from '../controllers/MealController';
import storedMeals from '../middleware/mealMiddleware';

const mealRoutes = (versionURL, app) => {
  app.get(`${versionURL}/meals`, MealController.getMeal);
  app.get(`${versionURL}/meals/:mealId`, MealController.getMealId);
  app.post(`${versionURL}/meals`, MealController.createMeal);
  app.put(`${versionURL}/meals/:mealId`, MealController.editMeal);
  app.delete(`${versionURL}/meals/:mealId`, storedMeals, MealController.removeMeal);
};

export default mealRoutes;
