const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: moment().format('MMMM Do YYYY, h:mm:ss a')
      },
    }),
  down: queryInterface/* , Sequelize */ => queryInterface.dropTable('Menus')
};
