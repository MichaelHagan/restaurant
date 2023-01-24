require('dotenv').config();
const express = require('express');
const router = express.Router();
const Admin = require('../models/admins');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function authenticate(req,res,next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.status(401).json("Unauthorized");
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err)=>{
    if(err) return res.status(403).send()
    next();
  })
}


  //Get all Admins
  router.get('/', authenticate, async(req, res)=> {
  
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
  
    Admin.findAll()
    .then(admins=> {
      res.header( 'Access-Control-Expose-Headers', 'X-Total-Count');
      res.header('X-Total-Count',`${admins.length}`);
  
      if(collumn === "id"){
        req.query._order === "ASC" ? admins.sort((a,b)=>parseInt(a[collumn]) - parseInt(b[collumn])) : admins.sort((a,b)=>parseInt(b[collumn]) - parseInt(a[collumn]));
        admins = admins.slice(req.query._start,req.query._end);
      }else if(collumn === "super"){
        req.query._order === "ASC" ? admins.sort((a,b)=>a[collumn] - b[collumn]) : admins.sort((a,b)=>b[collumn] - a[collumn]);
        admins = admins.slice(req.query._start,req.query._end);
      }
      else if(collumn !== undefined){
        admins.sort((a,b)=>compare(a[collumn],b[collumn],req.query._order));
        admins = admins.slice(req.query._start,req.query._end);
      }
  
      res.send(admins);
  })
    .catch(err=>{
      console.log(err)
      res.send("Error")
  })
  }catch(e){
    res.send(e)
  }
  });
  
  //Get single admin
  router.get('/:id', authenticate, async(req,res)=>{
    try{
      let{
       id
     }=req.params;
     
     const row = await Admin.findOne({
       where: { id: id },
     });
     res.json(row);
   }catch(e){
     res.send(e)
   }
   
   })
  
  //Add admin
  router.post('/',authenticate, async(req,res)=>{
  
    try{

    let { 
      name, 
      email,
      superAdmin,
      password,
    } = req.body;

    let hashedPassword = await bcrypt.hash(password,10);

    Admin.create({
        name, 
        email:email.toLowerCase(),
        superAdmin,
        password:hashedPassword,
    }).then( admin=>{
        res.send(admin);
      }
    ).catch(err=>{
        res.send(err.errors[0].message);
    })

    }catch(e){
        res.status(500).send();
    }

  
  })

  router.post('/login',async(req,res)=>{
    try{
        let{
         email,
         password
       }=req.body;
       
       const row = await Admin.findOne({
         where: { 
            email: email.toLowerCase()
        },
       });

       if(!row){
        return res.status(400).send("User not found");
       }

       if(await bcrypt.compare(password, row.password)){
        const user = {
          name:row.name
        }
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)

        res.json({accessToken:accessToken,name:row.name,super:row.superAdmin});
       }else{
        res.status(401).send(`Wrong Password`);
       }

     }catch(e){
       console.log(e)
     }
     
  })
  
  //Delete admin
  router.delete('/:id',authenticate, async(req,res)=>{
    try{
      let{
       id
     }=req.params;
  
    const row = await Admin.findOne({
      where: { id: id },
    });
    
    if (row) {
      await row.destroy(); // deletes the row
      res.json(row)
      console.log(`Entry for ${row.name} deleted succesfully.`);
    }else{
      res.send('Admin does not exist.')
    }
  }catch(e){
    res.send(e)
  }
  }
  )
  
  //Update admin
  router.put('/:id', authenticate, async(req,res)=>{
  
    try {
      const { id } = req.params;
      let output_str = "";
  
      let collumns = [
        "name", 
        "email",
        "superAdmin",
        "password",
      ]
  
      let check = true; //Will be used to res.send text if invalid or no collumn name is passed
  
      for (let i = 0; i < collumns.length; i++) {
  
          if (req.body.hasOwnProperty(collumns[i])) {
              check = false;
              let key = collumns[i];
              const value = req.body[key];
              
              if(key=="password"){
              //skip password update if password is unchanged
                const user = await Admin.findOne({
                  where: { id: id },
                });
                if(user.password === value)continue;

                let hashedPassword = await bcrypt.hash(value,10); //hash password

                await Admin.update(
                  { [key]: hashedPassword }, 	// attribute
                  { where: {id: id} }			// condition
                );
              }else{
              await Admin.update(
                { [key]: value }, 	// attribute
                { where: {id: id} }			// condition
              );
              }
  
              output_str += `Admin ${key} was updated with value ${value}\n`;
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