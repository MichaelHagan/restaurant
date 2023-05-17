const Admin = require('../models/admins');
const bcrypt = require('bcrypt');

const seed = async() =>{
  let hashedPassword = await bcrypt.hash('admin', 10);

  return {
      name: 'Administrator',
      email: 'admin',
      phone_number: '1234',
      superAdmin: true,
      password: hashedPassword
    };
}

  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await Admin.bulkCreate([await seed()]);
    }
  };
  