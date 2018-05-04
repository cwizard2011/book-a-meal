import MealController from '../controllers/MealController';

const mealRoutes = (versionURL, app) => {
  app.get(`${versionURL}/meals`, MealController.getMeals);
  app.get(`${versionURL}/meals/:id`, MealController.getMealById);
  app.post(`${versionURL}/meals`, MealController.createMeals);
  app.put(`${versionURL}/meals/:id`, MealController.editMeal);
  app.delete(`${versionURL}/meals/:id`, MealController.removeMeal);
};

export default mealRoutes;
