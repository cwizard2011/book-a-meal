import meals from '../data/meals';

const mealMiddleware = (req, res, next) => {
  req.meals = meals;
  next();
};

export default mealMiddleware;
