const Sequelize = require('sequelize');
const db = require('../config/database');

const order = db.define('Order',{
id:{
type: Sequelize.BIGINT, 
primaryKey: true,
autoIncrement: true
},
details:{
type:Sequelize.TEXT,
allowNull:false,
},
customer_name:{
type:Sequelize.STRING,
allowNull:false
},
customer_number:{
type:Sequelize.STRING,
allowNull:false
},
total_price:{
type:Sequelize.DOUBLE,
allowNull:false
},
order_state:{
type:Sequelize.STRING,
allowNull:false
},
payment:{
  type:Sequelize.BOOLEAN,
  allowNull:false,
  default:false
},
payment_type:{
  type:Sequelize.STRING,
  allowNull:false
}
},{
  tableName:'orders'  
}
);

module.exports = order;