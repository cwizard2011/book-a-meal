import MenuController from '../../controllers/MenuController';
import menus from '../../data/menus';

const valid = {
  menuName: 'Carbohydrate mixture',
  date: '23/07/2018',
  meals: ['Rice and Chicken', 'Beans and plantain', 'Pounded yam, vegetable and bush meat',
    'Fried rice, plantain and beef'],
};

const invalid1 = {
  menuName: 'Carbohydrate mixture',
  meals: ['Rice and Chicken', 'Beans and plantain', 'Pounded yam, vegetable and bush meat',
    'Fried rice, plantain and beef'],
};

const invalid2 = {
  date: '23/07/2018',
  meals: ['Rice and Chicken', 'Beans and plantain', 'Pounded yam, vegetable and bush meat',
    'Fried rice, plantain and beef'],
};
const invalid3 = {
  menuName: 'Carbohydrate mixture',
  date: '25/07/18'
};

const insertMenu = (menu) => {
  MenuController.createMenu(menu);
};

export { valid, invalid1, invalid2, invalid3, insertMenu };
