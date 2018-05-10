export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
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
      values: ['user', 'admin'],
      defaultValue: 'user',
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Order, { foreignKey: 'userId' });
    User.hasMany(models.Menu, { foreignKey: 'userId' });
  };
  return User;
};
