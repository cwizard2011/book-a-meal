export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    menuName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    userId: DataTypes.INTEGER,
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return Menu;
};
