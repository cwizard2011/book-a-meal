'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const meal = {
  id: 12,
  mealName: 'Chicken Salad',
  price: '# 5000',
  description: 'Best meal in town',
  mealAvatar: 'image1'
};
const invalid1 = {
  mealName: 'Chicken Salad1',
  price: '# 6000',
  description: 'Best meal in village',
  mealAvatar: 'image2'
};
const invalid2 = {
  id: 3,
  price: '# 5000',
  description: 'Best meal in town',
  mealAvatar: 'image3'
};
const invalid3 = {
  id: 4,
  mealName: 'Rice Salad',
  description: 'Best meal in town',
  mealAvatar: 'image4'
};
const invalid4 = {
  id: 7,
  mealName: 'Fruit Salad',
  price: '# 10000',
  mealAvatar: 'image5'
};
const invalid5 = {
  id: 8,
  mealName: 'Chicken Salad',
  price: '# 5000',
  description: 'Best meal in town'
};
const existMeal1 = {
  mealId: 1,
  mealName: 'Potato salad',
  description: 'Hot jolof rice with fried chicken mixed with gizzard',
  mealAvatar: 'imageurl1',
  price: '# 1200'
};
const existMeal2 = {
  mealId: 17,
  mealName: 'Fried Rice, Salad and Beef',
  description: 'Hot fried rice with salad, salad cream and Beef with option of malt or wine',
  mealAvatar: 'imageurl2',
  price: '# 1300'
};
exports.meal = meal;
exports.invalid1 = invalid1;
exports.invalid2 = invalid2;
exports.invalid3 = invalid3;
exports.invalid4 = invalid4;
exports.invalid5 = invalid5;
exports.existMeal1 = existMeal1;
exports.existMeal2 = existMeal2;
//# sourceMappingURL=meal.js.map