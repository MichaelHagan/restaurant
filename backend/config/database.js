const Sequelize = require("sequelize");
require('dotenv').config();

// Connect to the database
module.exports = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DBHOST,
    dialect: 'postgres',
    operatorsAliases: '0',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});