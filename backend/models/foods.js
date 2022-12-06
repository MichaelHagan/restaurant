const Sequelize = require('sequelize');
const db = require('../config/database');

const food = db.define('Food',{
id:{
type: Sequelize.BIGINT, 
primaryKey: true,
autoIncrement: true
},
name:{
type:Sequelize.STRING,
allowNull:false,
unique:true
},
description:{
type:Sequelize.STRING,
allowNull:false
},
imageUrl:{
type:Sequelize.STRING,
allowNull:false
},
price:{
type:Sequelize.DOUBLE,
allowNull:false
},
available:{
type:Sequelize.BOOLEAN,
allowNull:false,
defaultValue: true
},
category:{
type:Sequelize.STRING,
allowNull:false
}
},{
  tableName:'foods'  
}
);

module.exports = food;