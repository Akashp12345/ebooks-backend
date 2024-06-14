const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

class Books extends Model {}

Books.init({
  userID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  favourite: {
    type: DataTypes.JSON, 
    allowNull: false,
    defaultValue: [] 
  }
}, {
  sequelize,
  modelName: 'Books'
});

module.exports = Books;
