const meal = {
  mealId: 12,
  mealName: 'Chicken Salad',
  price: '# 5000',
  description: 'Best meal in town',
  mealAvatar: 'image1',
};
const invalid1 = {
  mealName: 'Chicken Salad1',
  price: '# 6000',
  description: 'Best meal in village',
  mealAvatar: 'image2',
};
const invalid2 = {
  mealId: 3,
  price: '# 5000',
  description: 'Best meal in town',
  mealAvatar: 'image3',
};
const invalid3 = {
  mealId: 4,
  mealName: 'Rice Salad',
  description: 'Best meal in town',
  mealAvatar: 'image4',
};
const invalid4 = {
  mealId: 7,
  mealName: 'Fruit Salad',
  price: '# 10000',
  mealAvatar: 'image5',
};
const invalid5 = {
  mealId: 8,
  mealName: 'Chicken Salad',
  price: '# 5000',
  description: 'Best meal in town',
};
const existMeal1 = {
  mealId: 1,
  mealName: 'Potato salad',
  description: 'Hot jolof rice with fried chicken mixed with gizzard',
  mealAvatar: 'imageurl1',
  price: '# 1200',
};
const existMeal2 = {
  mealId: 17,
  mealName: 'Fried Rice, Salad and Beef',
  description: 'Hot fried rice with salad, salad cream and Beef with option of malt or wine',
  mealAvatar: 'imageurl2',
  price: '# 1300',
};
const newMeal = {
  mealName: 'Moi moi and Ginger',
  description: 'The worst food you can ever order for',
  mealAvatar: 'imageurl8',
  price: '# 200',
};
export { meal, invalid1, invalid2, invalid3, invalid4, invalid5, existMeal1, existMeal2, newMeal };
