export default (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    mealName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: DataTypes.STRING,
    mealAvatar: DataTypes.STRING,
    price: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    menuId: DataTypes.INTEGER
  });
  Meal.associate = (models) => {
    Meal.belongsTo(models.Menu, {
      foreignKey: 'menuId',
      as: 'menu'
    });
    Meal.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'usermeal'
    });
    Meal.hasMany(models.Order, {
      foreignKey: 'mealId',
      as: 'orders'
    });
  };
  return Meal;
};
