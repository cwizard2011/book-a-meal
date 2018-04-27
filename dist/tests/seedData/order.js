'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const invalid1 = {
  customerId: 22,
  mealName: 'Jollof Rice',
  total: '# 5000'
};
const invalid2 = {
  orderId: 5,
  mealName: 'Jollof Rice',
  total: '# 5000'
};
const invalid3 = {
  orderId: 1,
  customerId: 22,
  total: '# 5000'
};
const invalid4 = {
  orderId: 7,
  customerId: 22,
  mealName: 'Jollof Rice'
};
const existOrder = {
  orderId: 1,
  customerId: 22,
  mealName: 'Jollof Rice',
  total: '# 5000'
};
const newOrder1 = {
  orderId: 1,
  customerId: 23,
  mealName: 'Jollof Rice',
  total: '# 5000'
};
const newOrder2 = {
  orderId: 2,
  customerId: 22,
  mealName: 'Jollof Rice',
  total: '# 5000'
};
const editOrder = {
  mealName: 'Chicken Rice',
  total: '# 7000'
};

exports.existOrder = existOrder;
exports.newOrder1 = newOrder1;
exports.newOrder2 = newOrder2;
exports.invalid1 = invalid1;
exports.invalid2 = invalid2;
exports.invalid3 = invalid3;
exports.invalid4 = invalid4;
exports.editOrder = editOrder;
//# sourceMappingURL=order.js.map