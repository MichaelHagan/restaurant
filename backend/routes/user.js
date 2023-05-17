require('dotenv').config();
const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/authentication');
const {
  getAllUsers,
  getUserById,
  addUser,
  userLogin,
  editUserById,
  deleteUserById
} = require("../controllers/userController");

//Get all Users
router.get('/', authenticate, getAllUsers)

//Get single user
router.get('/:id', authenticate, getUserById)

//Add user
router.post('/', addUser)

//User login
router.post('/login', userLogin)

//Update user
router.put('/:id', authenticate, editUserById)

//Delete user
router.delete('/:id', authenticate, deleteUserById)



module.exports = router;