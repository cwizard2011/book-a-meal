const invalid1 = {
  customerId: 22,
  mealName: 'Jollof Rice',
  total: '# 5000',
};
const invalid2 = {
  orderId: 5,
  mealName: 'Jollof Rice',
  total: '# 5000',
};
const invalid3 = {
  orderId: 1,
  customerId: 22,
  total: '# 5000',
};
const invalid4 = {
  orderId: 7,
  customerId: 22,
  mealName: 'Jollof Rice',
};
const existOrder = {
  orderId: 1,
  customerId: 22,
  mealName: 'Jollof Rice',
  total: '# 5000',
};
const newOrder1 = {
  orderId: 1,
  customerId: 23,
  mealName: 'Jollof Rice',
  total: '# 5000',
};
const newOrder2 = {
  orderId: 2,
  customerId: 22,
  mealName: 'Jollof Rice',
  total: '# 5000',
};
const editOrder = {
  mealName: 'Chicken Rice',
  total: '# 7000',
};

export { existOrder, newOrder1, newOrder2, invalid1, invalid2, invalid3, invalid4, editOrder };
