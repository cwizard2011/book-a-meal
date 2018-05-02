export default (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    mealName: {
      type: DataTypes.STRING,
      unique: true,
    },
    date: DataTypes.DATE,
    meals: DataTypes.STRING
  });
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'order',
      through: 'meals'
    });
    Order.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      as: 'order',
    });
  };
  return Order;
};
