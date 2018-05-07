export default (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    mealName: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.TEXT,
    mealAvatar: DataTypes.STRING,
    price: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  });
  return Meal;
};
