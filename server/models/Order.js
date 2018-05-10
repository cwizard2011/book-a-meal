export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    mealName: {
      type: DataTypes.STRING,
      unique: true,
    },
    mealId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    menuId: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    expires: DataTypes.DATE,
  });
  return Order;
};
