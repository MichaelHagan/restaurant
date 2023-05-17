require('dotenv').config();
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

module.exports = {authenticate};