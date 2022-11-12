import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ModalListElement from './ModalListElement';
import Swal from 'sweetalert2';
import './OrderModal.scss';

const OrderModal = ({orders,clearOrders}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);

  const switchModal = () =>{
    setOrderTotal(calculateTotal()+info.deliveryfee);
    setShow(false);
    setShow2(true);
  }

  const [orderTotal, setOrderTotal] = useState(0);

  const [info,setInfo] = useState({
    "location":"No Delivery",
    "deliveryfee":0
});

  const Delivery = { 
  "New York":5,
  "New Jersey":6,
  "Florida":5,
  "Queens":4,
  "Town":3,
  "No Delivery":0
}


const calculateTotal = () =>{
  let total = 0;

  for(let i = 0; i<orders.length;i++){
    total += orders[i].price * orders[i].quantity;
  }

  return total;

}


  const setFormInfo = (field,value) =>{
  setInfo({...info,
  [field]:value
  })
  }


  const orderHandler = ()=>{
    //Create API Call to send order and use response from server to trigger success or failure
    let status = true;

    if(status){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your order has been placed',
        showConfirmButton: false,
        timer: 2000
      })
      setShow2(false);

      (function(){
        clearOrders();
    })();
      
    
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Sorry, something went wrong, please check your order and try again',
        showConfirmButton: true,
      })
    }

  }

  const setDelivery=(location,deliveryfee)=>{
    setInfo({...info,
      "location":location,
      "deliveryfee":deliveryfee
      })
  }

  return (
    <div className='order-button'>

      <Button variant="outline-secondary" onClick={handleShow}>Order</Button>

      <Modal show={show} onHide={handleClose}
      centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                value={info.name}
                onChange = { e => setFormInfo('name',e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={info.number}
                onChange = { e => setFormInfo('number',e.target.value)}
              />
            </Form.Group>

        <Form.Group controlId="delivery">
          <Form.Label>Delivery</Form.Label>
          <Form.Select defaultValue="No Delivery" 
          value={info.location}
          onChange = { e => setDelivery(e.target.value,Delivery[e.target.value])}
          >
            <option>New York</option>
            <option>New Jersey</option>
            <option>Florida</option>
            <option>Queens</option>
            <option>Town</option>
            <option>No Delivery</option>
          </Form.Select>
        </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={switchModal}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display:"flex", flexDirection:"column", alignContent:"center"}}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <h5>{info.name}</h5>
            <h5>{info.number}</h5>
          </div>
        <div className='modal-list-element'>
        <div className='container'>
        <p className='quantity' style={{fontSize:"12px", fontWeight:"650"}}>QTY</p>
        <p className='name' style={{fontSize:"12px", fontWeight:"650"}}>FOOD</p>
        </div>
        <p className='total' style={{fontSize:"12px", fontWeight:"650"}}>TOTAL</p>
      </div>
          {orders.map(order=>{
              return <div key={order.id}>
              <ModalListElement 
              name={order.name}
              quantity={order.quantity}
              total={order.quantity * order.price}
              />
              </div>
          })}
          <div style={{ width: "100%", display: 
          "flex", borderBottom: "1px solid gray", 
          height:"3rem",
          justifyContent: "space-between"
          }}>
          <div style={{width:"85%", display:"flex", padding:"0"}}>
            <p style={{width:"20%", margin:"auto 0"}}>Delivery</p>
            <p style={{width:"65%", margin:"auto 0"}}>{info.location}</p>
          </div>
            <p style={{width:"15%", margin:"auto 0", textAlign:"right"}}>GHC{info.deliveryfee}</p>
          </div>
          <div style={{ width: "100%", display: "flex", justifyContent:"space-between"}}>
            <h3>
              Total
            </h3>
            <h3>
              GHC{orderTotal}
            </h3>
          </div>
        </Modal.Body>
        <Modal.Footer
        style={{justifyContent:"center"}}
        >
          <Button variant="success" onClick={orderHandler}>Place Order</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default OrderModal;