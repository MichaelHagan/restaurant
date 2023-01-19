const Sequelize = require('sequelize');
const db = require('../config/database');

const admin = db.define('Admin',{
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
superAdmin:{
type:Sequelize.BOOLEAN,
allowNull:false,
defaultValue: false
},
password:{
type:Sequelize.STRING,
allowNull:false
}
},{
  tableName:'admins'  
}
);

module.exports = admin;