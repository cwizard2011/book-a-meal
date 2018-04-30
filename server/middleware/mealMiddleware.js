import meals from '../data/meals';

const storedMeals = (req, res, next) => {
  req.meals = meals;
  next();
};

export default storedMeals;
