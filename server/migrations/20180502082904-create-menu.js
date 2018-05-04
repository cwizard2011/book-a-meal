module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menuName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      meals: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }),
  down: queryInterface/* , Sequelize */ => queryInterface.dropTable('Menus')
};
