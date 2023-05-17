const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/authentication');
const {
    getAllAdmins,
    getAdminById,
    addAdmin,
    editAdminById,
    deleteAdminById,
    adminLogin
  } = require("../controllers/adminController")

  //Get all Admins
  router.get('/', authenticate, getAllAdmins );
  
  //Get single admin
  router.get('/:id', authenticate, getAdminById )
  
  //Add admin
  router.post('/', authenticate, addAdmin )
  
  //Admin login
  router.post('/login',adminLogin )
  
  //Update admin
  router.put('/:id', authenticate, editAdminById)
  
  //Delete admin
  router.delete('/:id',authenticate, deleteAdminById)
  
  
  module.exports = router;