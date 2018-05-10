export default (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    mealName: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.TEXT,
    mealAvatar: DataTypes.STRING,
    price: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    expires: DataTypes.DATE,
  });
  Meal.associate = (models) => {
    Meal.belongsTo(models.Menu, {
      as: 'menu',
      foreignKey: 'menuId'
    });
  };
  return Meal;
};
