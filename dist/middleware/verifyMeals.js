"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const verifyMeal = (req, res, next) => {
  try {
    const { id } = req.params;

    const meals = req.meals.filter((meal, index) => {
      if (meal.id === id) {
        meals[index] = id;
        res.status(200).send(meals[index]);
        next();
      } else {
        return res.status(404).send({
          Error: `${req.body.title} Does not exist`
        });
      }
    });
  } catch (error) {
    res.send(error);
  }
};
exports.default = verifyMeal;
//# sourceMappingURL=verifyMeals.js.map