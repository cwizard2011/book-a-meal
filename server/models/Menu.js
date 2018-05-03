export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    menuName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    meals: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  });
  Menu.associate = (models) => {
    Menu.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'menu'
    });
    Menu.hasMany(models.Meal, {
      foreignKey: 'menuId',
      as: 'menumeal'
    });
  };
  return Menu;
};
