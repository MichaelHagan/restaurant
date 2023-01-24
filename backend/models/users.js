const Sequelize = require('sequelize');
const db = require('../config/database');
const order = require('./orders');

const user = db.define('User',{
id:{
type: Sequelize.BIGINT, 
primaryKey: true,
autoIncrement: true
},
name:{
type:Sequelize.STRING,
allowNull:false
},
email:{
type:Sequelize.STRING,
allowNull:false
},
phone_number:{
  type:Sequelize.STRING,
  allowNull:false
},
password:{
type:Sequelize.STRING,
allowNull:false
}
},{
  tableName:'users'  
}
);

user.hasMany(order);

module.exports = user;