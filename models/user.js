const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Associação
User.associate = (models) => {
  User.hasMany(models.Task, { foreignKey: 'userId' });
};

module.exports = User;
