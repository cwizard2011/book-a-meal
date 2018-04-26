'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menus = require('../data/menus');

var _menus2 = _interopRequireDefault(_menus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const menuMiddleware = (req, res, next) => {
  req.menus = _menus2.default;
  next();
};

exports.default = menuMiddleware;
//# sourceMappingURL=menuMiddleware.js.map