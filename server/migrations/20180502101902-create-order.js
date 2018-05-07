module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Orders', {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: Sequelize.INTEGER,
      total: Sequelize.STRING,
      mealId: Sequelize.INTEGER,
      expires: Sequelize.DATE,
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    }),
  down: queryInterface/* , Sequelize */ =>
    queryInterface.dropTable('Orders')
};
