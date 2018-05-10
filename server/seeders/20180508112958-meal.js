module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Meals', [{
      mealName: 'Jollof Rice',
      description: 'Nigerian best food',
      mealAvatar: 'rice image',
      price: 500,
      userId: 1,
      menuId: 1,
      expires: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      mealName: 'Fried Rice',
      description: 'Nigerian best food',
      mealAvatar: 'rice image',
      price: 500,
      userId: 2,
      menuId: 2,
      expires: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Meals', null, {});
  }
};
