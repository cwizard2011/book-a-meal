'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertMenu = exports.invalid3 = exports.invalid2 = exports.invalid1 = exports.valid = undefined;

var _MenuController = require('../../controllers/MenuController');

var _MenuController2 = _interopRequireDefault(_MenuController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const valid = {
  menuName: 'Carbohydrate mixture',
  date: '23/07/2018',
  meals: ['Rice and Chicken', 'Beans and plantain', 'Pounded yam, vegetable and bush meat', 'Fried rice, plantain and beef']
};

const invalid1 = {
  menuName: 'Carbohydrate mixture',
  meals: ['Rice and Chicken', 'Beans and plantain', 'Pounded yam, vegetable and bush meat', 'Fried rice, plantain and beef']
};

const invalid2 = {
  date: '23/07/2018',
  meals: ['Rice and Chicken', 'Beans and plantain', 'Pounded yam, vegetable and bush meat', 'Fried rice, plantain and beef']
};
const invalid3 = {
  menuName: 'Carbohydrate mixture',
  date: '25/07/18'
};

const insertMenu = menu => {
  _MenuController2.default.createMenu(menu);
};

exports.valid = valid;
exports.invalid1 = invalid1;
exports.invalid2 = invalid2;
exports.invalid3 = invalid3;
exports.insertMenu = insertMenu;
//# sourceMappingURL=menus.js.map