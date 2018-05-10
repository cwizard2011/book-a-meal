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
      mealId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Meals',
          key: 'id',
          as: 'groupId',
        },
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        }
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      total: Sequelize.INTEGER,
      expires: Sequelize.DATE,
    }),
  down: queryInterface/* , Sequelize */ =>
    queryInterface.dropTable('Orders')
};
