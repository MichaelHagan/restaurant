const express = require('express');
const router = express.Router();
const Fee = require('../models/deliveries');
const jwt = require('jsonwebtoken');


function authenticate(req,res,next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.status(401).json("Unauthorized");
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err)=>{
    if(err) return res.status(403).send();
    next();
  })
}

//Get all delivery_fees  
router.get('/', async(req, res)=> {

    const compare = (a,b,sort)=>{
    if(a!== null && b!== null){
    let first = a.split(' ').join('').toLowerCase();
    let second = b.split(' ').join('').toLowerCase();
    
    if(sort === 'ASC'){
    
      if(first>second)
      {
        return 1
      }else{
        return -1
      }
    
    }else{
      if(first>second)
      {
        return -1
      }else{
        return 1
      }
    }
    }
    }


  try{
    let collumn = req.query._sort;

    Fee.findAll()
    .then(fees=> {
      res.header( 'Access-Control-Expose-Headers', 'X-Total-Count');
      res.header('X-Total-Count',`${fees.length}`);

      if(collumn === "id"){
        req.query._order === "ASC" ? fees.sort((a,b)=>parseInt(a[collumn]) - parseInt(b[collumn])) : fees.sort((a,b)=>parseInt(b[collumn]) - parseInt(a[collumn]));
        fees = fees.slice(req.query._start,req.query._end);
      }else if(collumn === "price"||collumn === "createdAt" || collumn === "updatedAt"|| collumn === "available"){
        req.query._order === "ASC" ? fees.sort((a,b)=>a[collumn] - b[collumn]) : fees.sort((a,b)=>b[collumn] - a[collumn]);
        fees = fees.slice(req.query._start,req.query._end);
      }
      else if(collumn !== undefined){
        fees.sort((a,b)=>compare(a[collumn],b[collumn],req.query._order));
        fees = fees.slice(req.query._start,req.query._end);
      }

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

//Get single delivery
router.get('/:id',async(req,res)=>{
  try{
    let{
     id
   }=req.params;
   
   const row = await Fee.findOne({
     where: { id: id },
   });
 
   res.json(row);
 }catch(e){
   res.send(e)
 }
 
 })
  

//Add delivery_fee
router.post('/', authenticate, async(req,res)=>{

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
  router.delete('/:id', authenticate, async(req,res)=>{
    try{
      let{
      id
    }=req.params;
  
    const row = await Fee.findOne({
      where: { id: id },
    });
    
    if (row) {
      await row.destroy(); // deletes the row
      res.json(row);
      console.log(`Entry for ${row.name} deleted succesfully.`)
    }else{
      res.send('Delivery location does not exist.')
    }
  }catch(e){
    res.send(e)
  }
  }
  )
  
  //Update delivery_fee
  router.put('/:id', authenticate, async(req,res)=>{
  
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
  
      for (const element of collumns) {
  
          if (req.body.hasOwnProperty(element)) {
              check = false;
              let key = element;
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
        console.log(output_str);
        res.json(req.body);
      }
  
  } catch (e) {
      res.send(e.message)
  }
  
  })  

  module.exports = router;