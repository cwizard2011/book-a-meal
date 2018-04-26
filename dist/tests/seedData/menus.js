'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
const invalid4 = {
  menuName: 12542,
  date: '23/07/2018',
  meals: ['Rice and Chicken', 'Beans and plantain', 'Pounded yam, vegetable and bush meat', 'Fried rice, plantain and beef']
};
exports.valid = valid;
exports.invalid1 = invalid1;
exports.invalid2 = invalid2;
exports.invalid3 = invalid3;
exports.invalid4 = invalid4;
//# sourceMappingURL=menus.js.map