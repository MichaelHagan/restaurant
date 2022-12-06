const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Fee = require('../models/deliveries');


router.get('/authenticate', async function(req, res, next) {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        res.send("success");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.send("error");
      }
  });

//Get all delivery_fees  
router.get('/', async(req, res)=> {
    try{
    Fee.findAll()
    .then(fees=> {
      res.send(fees);
  })
    .catch(err=>{
      console.log(err)
      res.send("Error")
  })
  }catch(e){
    res.send(e)
  }
  });
  

//Add delivery_fee
router.post('/add',async(req,res)=>{

    let { 
      location,
      price,
      available,
    } = req.body;
  
    Fee.create({
        location,
        price,
        available,
    }).then( fee=>{
        res.send(fee);
      }
    ).catch(err=>{
        res.send(err.errors[0].message);
    })
  
  })
  
  //Delete delivery_fee
  router.delete('/delete',async(req,res)=>{
    try{
      let{
      location
    }=req.body
  
    const row = await Fee.findOne({
      where: { location: location },
    });
    
    if (row) {
      await row.destroy(); // deletes the row
      res.send(`Entry for ${row.name} deleted succesfully.`)
    }else{
      res.send('Delivery location does not exist.')
    }
  }catch(e){
    res.send(e)
  }
  }
  )
  
  //Update delivery_fee
  router.put('/update/:id',async(req,res)=>{
  
    //Chose not to use location as identifier this time considering the fact that user might change location.
    //Rather use location in front end to get delivery id, use id then as identifier
  
    try {
      const { id } = req.params;
      let output_str = "";
  
      let collumns = [
        "location",
        "price",
        "available",
      ]
  
      let check = true; //Will be used to res.send text if invalid or no collumn name is passed
  
      for (let i = 0; i < collumns.length; i++) {
  
          if (req.body.hasOwnProperty(collumns[i])) {
              check = false;
              let key = collumns[i];
              const value = req.body[key];
              const update = await Fee.update(
                { [key]: value }, 	// attribute
                { where: {id: id} }			// condition
              );
  
              output_str += `Delivery ${key} was updated with value ${value}\n`;
              console.log(update);
          }
      }
  
      if (check) {
          res.send("Attribute passed does not exist or null attribute passed")
      } else {
          res.send(output_str);
      }
  
  } catch (e) {
      res.send(e.message)
  }
  
  })  

  module.exports = router;