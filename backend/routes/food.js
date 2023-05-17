const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/authentication');
const multer = require('multer');
const upload = multer({ dest: './public/uploads' });
const {
  getAllFoods,
  getFoodById,
  addFood,
  editFoodById,
  deleteFoodById
} = require("../controllers/foodController");

//Get all foods
router.get('/', getAllFoods)


//Get single food
router.get('/:id', getFoodById)

//Add food
router.post('/', authenticate, upload.single('image'), addFood)

//Update food
router.put('/:id', authenticate, upload.single('image'), editFoodById)

//Delete food
router.delete('/:id', authenticate, deleteFoodById)


module.exports = router;