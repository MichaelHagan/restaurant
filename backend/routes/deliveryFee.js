const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/authentication');
const {
  getAllDeliveries,
  getDeliveryById,
  addDelivery,
  editDeliveryById,
  deleteDeliveryById,
} = require("../controllers/deliveryFeeController");

//Get all delivery_fees  
router.get('/', getAllDeliveries);

//Get single delivery
router.get('/:id', getDeliveryById)


//Add delivery_fee
router.post('/', authenticate, addDelivery)

//Update delivery_fee
router.put('/:id', authenticate, editDeliveryById)

//Delete delivery_fee
router.delete('/:id', authenticate, deleteDeliveryById)


module.exports = router;