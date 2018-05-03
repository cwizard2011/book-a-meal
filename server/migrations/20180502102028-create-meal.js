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
        allowNull: false,
      },
      description: Sequelize.STRING,
      mealAvatar: Sequelize.STRING,
      price: Sequelize.STRING,
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
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      menuId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Menus',
          key: 'id',
          as: 'menuId'
        }
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id',
          as: 'orderId'
        }
      },
    }),
  down: queryInterface/* , Sequelize */ =>
    queryInterface.dropTable('Meals'),
};
