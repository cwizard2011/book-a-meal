export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    mealName: {
      type: DataTypes.STRING,
      unique: true,
    },
    userId: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    expires: DataTypes.DATE,
  });
  Order.associate = (models) => {
    Order.belongsTo(models.Meal, {
      as: 'meals',
      foreignKey: 'mealId'
    });
    Order.belongsTo(models.User, {
      as: 'meals',
      foreignKey: 'userId'
    });
  };
  return Order;
};
