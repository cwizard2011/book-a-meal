module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menuName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: Sequelize.INTEGER,
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    }),
  down: queryInterface/* , Sequelize */ => queryInterface.dropTable('Menus')
};
