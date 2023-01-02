const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Food = require('../models/foods');



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

  Food.findAll()
  .then(foods=> {
    res.header( 'Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count',`${foods.length}`);

    if(collumn === "id"){
      req.query._order === "ASC" ? foods.sort((a,b)=>parseInt(a[collumn]) - parseInt(b[collumn])) : foods.sort((a,b)=>parseInt(b[collumn]) - parseInt(a[collumn]));
      foods = foods.slice(req.query._start,req.query._end);
    }else if(collumn === "price"||collumn === "createdAt" || collumn === "updatedAt"|| collumn === "available"){
      req.query._order === "ASC" ? foods.sort((a,b)=>a[collumn] - b[collumn]) : foods.sort((a,b)=>b[collumn] - a[collumn]);
      foods = foods.slice(req.query._start,req.query._end);
    }
    else if(collumn !== undefined){
      foods.sort((a,b)=>compare(a[collumn],b[collumn],req.query._order));
      foods = foods.slice(req.query._start,req.query._end);
    }

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
   res.json(row);
 }catch(e){
   res.send(e)
 }
 
 })

//Add food
router.post('/',async(req,res)=>{

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
router.delete('/:id',async(req,res)=>{
  try{
    let{
     id
   }=req.params;

  const row = await Food.findOne({
    where: { id: id },
  });
  
  if (row) {
    await row.destroy(); // deletes the row
    res.json(row)
    console.log(`Entry for ${row.name} deleted succesfully.`);
  }else{
    res.send('Food does not exist.')
  }
}catch(e){
  res.send(e)
}
}
)

//Update food
router.put('/:id',async(req,res)=>{

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
            await Food.update(
              { [key]: value }, 	// attribute
              { where: {id: id} }			// condition
            );

            output_str += `Food ${key} was updated with value ${value}\n`;
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