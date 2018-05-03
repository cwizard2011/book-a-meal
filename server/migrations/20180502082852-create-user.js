module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email detected. Kindly supply a valid email'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      password: Sequelize.STRING,
      role: {
        type: Sequelize.ENUM,
        values: ['user', 'admin']
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
    }),
  down: queryInterface/* , Sequelize */ => queryInterface.dropTable('Users'),
};
