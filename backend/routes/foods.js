const express = require('express');
const router = express.Router();
const Food = require('../models/foods');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: './public/uploads' });
const {cloudinary} = require('../cloudinary');


function authenticate(req,res,next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.status(401).json("Unauthorized");
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err)=>{
    if(err) return res.status(403).send()
    next();
  })
}

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
router.post('/',authenticate, upload.single('image'),async(req,res)=>{

  const imageData = req.file;
  let imageUrl = imageData.filename;

  let { 
    name, 
    description,
    price,
    available,
    category
  } = JSON.parse(req.body.data);

  if(imageData){
    const result = await cloudinary.uploader.upload(imageData.path,{
      upload_preset: 'test_preset'
    });
    imageUrl = result.secure_url;
  }

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
router.delete('/:id', authenticate, async(req,res)=>{
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
router.put('/:id',authenticate, upload.single('image'), async(req,res)=>{
  const data = JSON.parse(req.body.data);
  const imageData = req.file;

  try {
    const { id } = req.params;
    let output_str = "";

    let collumns = [
      "name", 
      "description",
      "price",
      "available",
      "category"
    ]

    let check = true; //Will be used to res.send text if invalid or no collumn name is passed

    for (const element of collumns) {

        if (data.hasOwnProperty(element)) {
            check = false;
            let key = element;
            const value = data[key];
            await Food.update(
              { [key]: value }, 	// attribute
              { where: {id: id} }			// condition
            );
            
            output_str += `Food ${key} was updated with value ${value}\n`;
        }
    }

    if(imageData){
      check = false;
      const result = await cloudinary.uploader.upload(imageData.path,{
        upload_preset: 'test_preset'
      });

      await Food.update(
        { "imageUrl": result.secure_url},
        { where: {id: id} }
      );
      output_str += `Food imageUrl was updated with value ${imageData.filename}\n`;
    }

    if (check) {
        res.send("Attribute passed does not exist or null attribute passed")
    } else {
        console.log(output_str);
        res.json(data);
    }

} catch (e) {
    res.send(e.message)
    console.log(e.message)
}

})

module.exports = router;