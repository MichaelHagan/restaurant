const Sequelize = require('sequelize');
const db = require('../config/database');
const order = require('./orders');

const delivery_fee = db.define('Delivery_Fee',{
id:{
type: Sequelize.BIGINT, 
primaryKey: true,
autoIncrement: true
},
location:{
type:Sequelize.STRING,
allowNull:false,
unique:true
},
price:{
type:Sequelize.DOUBLE,
allowNull:false
},
available:{
type:Sequelize.BOOLEAN,
allowNull:false,
defaultValue: true
}
},{
  tableName:'delivery_fees'  
}
);
delivery_fee.hasMany(order)


module.exports = delivery_fee;