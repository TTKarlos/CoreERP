require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 80,
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || 9001,
        user: process.env.MYSQL_USER || 'erp-user',
        password: process.env.MYSQL_PASSWORD || 'password',
        database: process.env.MYSQL_DATABASE || 'erp_wholesale_db'
    }
};