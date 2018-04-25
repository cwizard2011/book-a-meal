'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MealController = require('../controllers/MealController');

var _MealController2 = _interopRequireDefault(_MealController);

var _mealMiddleware = require('../middleware/mealMiddleware');

var _mealMiddleware2 = _interopRequireDefault(_mealMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mealRoutes = (versionURL, app) => {
  app.get(`${versionURL}/meals`, _mealMiddleware2.default, _MealController2.default.getMeal);
  app.get(`${versionURL}/meals/:mealId`, _mealMiddleware2.default, _MealController2.default.getMealId);
  app.post(`${versionURL}/meals`, _mealMiddleware2.default, _MealController2.default.createMeal);
  app.put(`${versionURL}/meals/:mealId`, _mealMiddleware2.default, _MealController2.default.editMeal);
  app.delete(`${versionURL}/meals/:mealId`, _mealMiddleware2.default, _MealController2.default.removeMeal);
};

exports.default = mealRoutes;
//# sourceMappingURL=mealRoutes.js.map