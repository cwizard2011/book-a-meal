'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _meals = require('../data/meals');

var _meals2 = _interopRequireDefault(_meals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mealMiddleware = (req, res, next) => {
  req.meals = _meals2.default;
  next();
};

exports.default = mealMiddleware;
//# sourceMappingURL=mealMiddleware.js.map