'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _menuRoutes = require('./routes/menuRoutes');

var _menuRoutes2 = _interopRequireDefault(_menuRoutes);

var _mealRoutes = require('./routes/mealRoutes');

var _mealRoutes2 = _interopRequireDefault(_mealRoutes);

var _orderRoutes = require('./routes/orderRoutes');

var _orderRoutes2 = _interopRequireDefault(_orderRoutes);

var _port = require('./port/port');

var _port2 = _interopRequireDefault(_port);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || _port2.default;
const app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _expressValidator2.default)());

(0, _menuRoutes2.default)('/api/v1', app);
(0, _mealRoutes2.default)('/api/v1', app);
(0, _orderRoutes2.default)('/api/v1', app);

app.listen(port);

exports.default = app;
//# sourceMappingURL=app.js.map