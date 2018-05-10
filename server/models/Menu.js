const moment = require('moment');

export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
  });
  Menu.associate = (models) => {
    Menu.hasMany(models.Meal, {
      as: 'meals',
      foreignKey: 'menuId'
    });
  };
  return Menu;
};
