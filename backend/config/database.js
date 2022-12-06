const Sequelize = require( "sequelize") ;

module. exports = new Sequelize('restaurant_db', 'postgres', 'postgres', {
host: '127.0.0.1',
dialect: 'postgres',
operatorsAliases : '0',
pool:{
max: 5,
min: 0,
acquire: 30000,
idle: 10000
},
});