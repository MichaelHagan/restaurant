const Order = require('../models/orders');
const { sort } = require('../utils/sortHelper');

const getAllOrders = async (req, res) => {

  try {
    let orders = await Order.findAll();
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', `${orders.length}`);
    let sortedOrders = sort(req,orders);
    res.send(sortedOrders);
  } catch (e) {
    res.send(e)
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {

    let {
      userId
    } = req.params;

    Order.findAll({
      where: { userId },
    }).then(orders => {
      res.send(orders);
    }).catch(err => {
      console.log(err)
      res.send("Error")
    });

  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const getOrderById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await Order.findOne({
      where: { id: id },
    });

    res.json(row);
  } catch (e) {
    res.send(e)
  }

};

const addOrder = async (req, res) => {

  let {
    details,
    customer_name,
    customer_number,
    total_price,
    order_state,
    payment,
    payment_type,
    DeliveryFeeId
  } = req.body;

  Order.create({
    details,
    customer_name,
    customer_number,
    total_price,
    order_state,
    payment,
    payment_type,
    DeliveryFeeId
  }).then(order => {
    res.send(order);
  }
  ).catch(err => {
    res.send(err.errors[0].message);
  })

};

const editOrderById = async (req, res) => {

  try {
    const { id } = req.params;
    let output_str = "";

    let collumns = [
      "details",
      "customer_name",
      "customer_number",
      "total_price",
      "order_state",
      "payment",
      "payment_type",
    ]

    let check = true; //Will be used to res.send text if invalid or no collumn name is passed

    for (const element of collumns) {

      if (req.body.hasOwnProperty(element)) {
        check = false;
        let key = element;
        const value = req.body[key];
        await Order.update(
          { [key]: value }, 	// attribute
          { where: { id: id } }			// condition
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

};

const deleteOrderById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await Order.findOne({
      where: { id: id },
    });

    if (row) {
      await row.destroy(); // deletes the row
      res.json(row);
      console.log(`Order deleted succesfully.`);
    } else {
      res.send('Order does not exist.')
    }
  } catch (e) {
    res.send(e)
  }
};


module.exports = {
  getAllOrders,
  getAllOrdersByUser,
  getOrderById,
  addOrder,
  editOrderById,
  deleteOrderById,
};
