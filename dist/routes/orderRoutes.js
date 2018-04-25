'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _OrderController = require('../controllers/OrderController');

var _OrderController2 = _interopRequireDefault(_OrderController);

var _orderMiddleware = require('../middleware/orderMiddleware');

var _orderMiddleware2 = _interopRequireDefault(_orderMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderRoutes = (versionURL, app) => {
  app.get(`${versionURL}/orders`, _orderMiddleware2.default, _OrderController2.default.getOrder);
  app.post(`${versionURL}/orders`, _orderMiddleware2.default, _OrderController2.default.createOrder);
  app.put(`${versionURL}/orders/:orderId`, _orderMiddleware2.default, _OrderController2.default.editOrder);
};

exports.default = orderRoutes;
//# sourceMappingURL=orderRoutes.js.map