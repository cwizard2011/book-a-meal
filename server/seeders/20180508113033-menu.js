module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Menus', [{
      menuName: 'Delicious Menu',
      userId: 1,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      menuName: 'African dish',
      userId: 2,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Menus', null, {});
  }
};

