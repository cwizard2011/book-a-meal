export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email detected. Kindly supply a valid email'
        }
      }
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin']
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Meal, {
      foreignKey: 'userId',
      as: 'meal'
    });
    User.hasMany(models.Menu, {
      foreignKey: 'userId',
      as: 'menu'
    });
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'order'
    });
  };
  return User;
};
