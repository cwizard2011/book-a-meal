export default (sequelize, DataTypes) => {
  const Meal = sequelize.define('meal', {
    mealName: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.STRING,
    mealAvatar: DataTypes.STRING,
    price: DataTypes.STRING,
  });
  Meal.associate = (models) => {
    Meal.belongsTo(models.Menu, {
      foreignKey: 'menuId',
      as: 'meal'
    });
    Meal.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'meal'
    });
  };
  return Meal;
};
