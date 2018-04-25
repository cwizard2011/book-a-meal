import MealController from '../controllers/MealController';
import mealMiddleware from '../middleware/mealMiddleware';

const mealRoutes = (versionURL, app) => {
  app.get(`${versionURL}/meals`, mealMiddleware, MealController.getMeal);
  app.post(`${versionURL}/meals`, mealMiddleware, MealController.createMeal);
};

export default mealRoutes;
