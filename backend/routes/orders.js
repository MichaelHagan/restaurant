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
 try{
   Order.findAll()
  .then(orders=> {
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

  res.send(row);
}catch(e){
  res.send(e)
}

})

//Add order
router.post('/add',async(req,res)=>{

  let { 
    details, 
    customer_name,
    customer_number,
    total_price,
    order_state
  } = req.body;

  Order.create({
    details, 
    customer_name,
    customer_number,
    total_price,
    order_state
  }).then( order=>{
      res.send(order);
    }
  ).catch(err=>{
      res.send(err.errors[0].message);
  })

})

//Delete order
router.delete('/delete/:id',async(req,res)=>{
  try{
    let{
    id
  }=req.params;

  const row = await Order.findOne({
    where: { id: id },
  });
  
  if (row) {
    await row.destroy(); // deletes the row
    res.send(`Order deleted succesfully.`)
  }else{
    res.send('Order does not exist.')
  }
}catch(e){
  res.send(e)
}
}
)

//Update order
router.put('/update/:id',async(req,res)=>{

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
            const update = await Order.update(
              { [key]: value }, 	// attribute
              { where: {id: id} }			// condition
            );

            output_str += `Order ${key} was updated with value ${value}\n`;
            console.log(update);
        }
    }

    if (check) {
        res.send("Attribute passed does not exist or null attribute passed")
    } else {
        res.send(output_str);
    }

} catch (e) {
    res.send(e)
}

})

module.exports = router;