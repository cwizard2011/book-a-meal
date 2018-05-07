export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    mealName: {
      type: DataTypes.STRING,
      unique: true,
    },
    mealId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    total: DataTypes.STRING,
    expires: DataTypes.DATE,
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return Order;
};
