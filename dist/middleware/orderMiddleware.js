'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _orders = require('../data/orders');

var _orders2 = _interopRequireDefault(_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderMiddleware = (req, res, next) => {
  req.orders = _orders2.default;
  next();
};

exports.default = orderMiddleware;
//# sourceMappingURL=orderMiddleware.js.map