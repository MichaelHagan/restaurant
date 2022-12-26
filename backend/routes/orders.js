var express = require('express');
var router = express.Router();
const db = require('../config/database');
const Order = require('../models/orders');



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

//Get all orders
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

   Order.findAll()
  .then(orders=> {
    res.header( 'Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count',`${orders.length}`);

    if(collumn === "id" || collumn === "DeliveryFeeId"){
      req.query._order === "ASC" ? orders.sort((a,b)=>parseInt(a[collumn]) - parseInt(b[collumn])) : orders.sort((a,b)=>parseInt(b[collumn]) - parseInt(a[collumn]));
      orders = orders.slice(req.query._start,req.query._end);
    }else if(collumn === "total_price"||collumn === "createdAt" || collumn === "updatedAt"){
      req.query._order === "ASC" ? orders.sort((a,b)=>a[collumn] - b[collumn]) : orders.sort((a,b)=>b[collumn] - a[collumn]);
      orders = orders.slice(req.query._start,req.query._end);
    }
    else{
      orders.sort((a,b)=>compare(a[collumn],b[collumn],req.query._order));
      orders = orders.slice(req.query._start,req.query._end);
    }
    res.send(orders);
})
  .catch(err=>{
    console.log(err)
    res.send("Error")
})

}catch(e){
  res.send(e)
}
});

//Get single order
router.get('/:id',async(req,res)=>{
 try{
   let{
    id
  }=req.params;
  
  const row = await Order.findOne({
    where: { id: id },
  });

  res.json(row);
}catch(e){
  res.send(e)
}

})

//Add order
router.post('/',async(req,res)=>{

  let { 
    details, 
    customer_name,
    customer_number,
    total_price,
    order_state,
    DeliveryFeeId
  } = req.body;

  Order.create({
    details, 
    customer_name,
    customer_number,
    total_price,
    order_state,
    DeliveryFeeId
  }).then( order=>{
      res.send(order);
    }
  ).catch(err=>{
      res.send(err.errors[0].message);
  })

})

//Delete order
router.delete('/:id',async(req,res)=>{
  try{
    let{
    id
  }=req.params;

  const row = await Order.findOne({
    where: { id: id },
  });
  
  if (row) {
    await row.destroy(); // deletes the row
    res.json(row);
    console.log(`Order deleted succesfully.`);
  }else{
    res.send('Order does not exist.')
  }
}catch(e){
  res.send(e)
}
}
)

//Update order
router.put('/:id',async(req,res)=>{

  try {
    const { id } = req.params;
    let output_str = "";

    let collumns = [
      "details", 
      "customer_name",
      "customer_number",
      "total_price",
      "order_state"
    ]

    let check = true; //Will be used to res.send text if invalid or no collumn name is passed

    for (let i = 0; i < collumns.length; i++) {

        if (req.body.hasOwnProperty(collumns[i])) {
            check = false;
            let key = collumns[i];
            const value = req.body[key];
            await Order.update(
              { [key]: value }, 	// attribute
              { where: {id: id} }			// condition
            );

            output_str += `Order ${key} was updated with value ${value}\n`;
        }
    }

    if (check) {
        res.send("Attribute passed does not exist or null attribute passed")
    } else {
      console.log(output_str);
      res.json(req.body);
    }

} catch (e) {
    res.send(e)
}

})

module.exports = router;