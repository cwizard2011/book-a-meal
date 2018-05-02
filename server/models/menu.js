export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('menu', {
    menuName: {
      type: DataTypes.STRING,
      unique: true,
    },
    date: DataTypes.DATE,
    meals: DataTypes.STRING
  });
  Menu.associate = (models) => {
    Menu.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'menu'
    });
    Menu.hasMany(models.Meal, {
      foreignKey: 'mealId',
    });
  };
  return Menu;
};
