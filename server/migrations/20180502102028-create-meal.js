module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Meals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mealName: {
        type: Sequelize.STRING,
        unique: true,
      },
      description: Sequelize.TEXT,
      expires: Sequelize.DATE,
      mealAvatar: Sequelize.STRING,
      price: Sequelize.INTEGER,
      menuId: Sequelize.INTEGER,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: Sequelize.INTEGER,
    }),
  down: queryInterface/* , Sequelize */ =>
    queryInterface.dropTable('Meals'),
};
