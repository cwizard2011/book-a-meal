
module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Orders', [{
      mealName: 'Fried rice',
      mealId: 1,
      userId: 1,
      total: 700,
      expires: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      mealName: 'Jollof rice',
      mealId: 2,
      userId: 2,
      total: 700,
      expires: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};

