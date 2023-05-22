const Sequelize = require("sequelize");
require('dotenv').config();
const dbName = process.env.DATABASE_NAME;

// Connect to the database
module.exports = new Sequelize(dbName, 'postgres', 'postgres', {
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: '0',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});