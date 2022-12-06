const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Food = require('../models/foods')



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

//Get all foods
router.get('/', async(req, res)=> {
  try{
  Food.findAll()
  .then(foods=> {
    res.send(foods);
})
  .catch(err=>{
    console.log(err)
    res.send("Error")
})
}catch(e){
  res.send(e)
}
});

//Get single food
router.get('/:id',async(req,res)=>{
  try{
    let{
     id
   }=req.params;
   
   const row = await Food.findOne({
     where: { id: id },
   });
 
   res.send(row);
 }catch(e){
   res.send(e)
 }
 
 })

//Add food
router.post('/add',async(req,res)=>{

  let { 
    name, 
    description,
    imageUrl,
    price,
    available,
    category
  } = req.body;

  Food.create({
    name, 
    description,
    imageUrl,
    price,
    available,
    category
  }).then( food=>{
      res.send(food);
    }
  ).catch(err=>{
      res.send(err.errors[0].message);
  })

})

//Delete food
router.delete('/delete',async(req,res)=>{
  try{
    let{
    name
  }=req.body

  const row = await Food.findOne({
    where: { name: name },
  });
  
  if (row) {
    await row.destroy(); // deletes the row
    res.send(`Entry for ${row.name} deleted succesfully.`)
  }else{
    res.send('Food does not exist.')
  }
}catch(e){
  res.send(e)
}
}
)

//Update food
router.put('/update/:id',async(req,res)=>{

  //Chose not to use food name as identifier this time considering the fact that user might change food name.
  //Rather use food name in front end to get food id, use id then as identifier

  try {
    const { id } = req.params;
    let output_str = "";

    let collumns = [
      "name", 
      "description",
      "imageUrl",
      "price",
      "available",
      "category"
    ]

    let check = true; //Will be used to res.send text if invalid or no collumn name is passed

    for (let i = 0; i < collumns.length; i++) {

        if (req.body.hasOwnProperty(collumns[i])) {
            check = false;
            let key = collumns[i];
            const value = req.body[key];
            const update = await Food.update(
              { [key]: value }, 	// attribute
              { where: {id: id} }			// condition
            );

            output_str += `Food ${key} was updated with value ${value}\n`;
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