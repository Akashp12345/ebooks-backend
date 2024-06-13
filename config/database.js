const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
});


const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (err) {
    console.error('Unable to synchronize the database:', err);
  }
};



module.exports ={startServer};
