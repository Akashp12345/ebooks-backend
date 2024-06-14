const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

class User extends Model {}

User.init({
  userID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey:true
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
    }
}, {
  sequelize,
  modelName: 'User'
});

module.exports = User;
