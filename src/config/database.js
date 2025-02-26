const { Sequelize } = require('sequelize');
const config = require('./index');

console.log('Attempting to connect to database with config:', config.mysql);

const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.user,
    config.mysql.password,
    {
        host: config.mysql.host,
        port: config.mysql.port,
        dialect: 'mysql',
        logging: console.log,
        dialectOptions: {
            connectTimeout: 60000
        }
    }
);

module.exports = sequelize;