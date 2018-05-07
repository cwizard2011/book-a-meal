export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    menuName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    meals: {
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue('meals'));
      },
      set: function (val) {
        return this.setDataValue('meals', JSON.stringify(val));
      }
    },
    userId: DataTypes.INTEGER,
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return Menu;
};
