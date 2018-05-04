export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    mealName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return Order;
};
