export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    mealName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    date: DataTypes.DATE,
    meals: DataTypes.STRING,
    mealId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  });
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'order',
      through: 'ordermeal'
    });
    Order.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      as: 'orders',
    });
  };
  return Order;
};
