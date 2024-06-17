const { Sequelize } = require('sequelize');
require('dotenv').config(); // Ensure this is loaded to read environment variables
const config=require('./config')
const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    port:  3306,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    },
    logging: false,
  }
);

const startDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Database connected and authenticated successfully');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};
   
module.exports = { startDatabase, sequelize };
