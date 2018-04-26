'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MenuController = require('../controllers/MenuController');

var _MenuController2 = _interopRequireDefault(_MenuController);

var _menuMiddleware = require('../middleware/menuMiddleware');

var _menuMiddleware2 = _interopRequireDefault(_menuMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const menuRoutes = (versionURL, app) => {
  app.get(`${versionURL}/menus`, _menuMiddleware2.default, _MenuController2.default.getMenu);
  app.post(`${versionURL}/menus`, _menuMiddleware2.default, _MenuController2.default.createMenu);
};

exports.default = menuRoutes;
//# sourceMappingURL=menuRoutes.js.map