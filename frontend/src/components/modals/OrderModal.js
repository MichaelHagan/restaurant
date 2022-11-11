import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ModalListElement from './ModalListElement';
import Swal from 'sweetalert2';
import './OrderModal.scss';

const OrderModal = ({orders}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);

  const switchModal = () =>{
    setShow(false);
    setShow2(true);
  }

  let val = 'test';

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
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Sorry, something went wrong, please check your order and try again',
        showConfirmButton: true,
      })
    }


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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
              />
            </Form.Group>

        <Form.Group controlId="formGridState">
          <Form.Label>Delivery</Form.Label>
          <Form.Select defaultValue="No Delivery" value={val}>
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
          {orders.map(order=>{
              return <div key={order.id}>
              <ModalListElement 
              name={order.name}
              quantity={order.quantity}
              total={order.quantity * order.price}
              />
              </div>
          })}
          <div style={{ width: "100%", display: "flex", borderBottom: "1px solid gray", height:"3rem"}}>
            <p style={{width:"20%", margin:"auto 0"}}>Delivery</p>
            <p style={{width:"65%", margin:"auto 0"}}>{val}</p>
            <p style={{width:"15%", margin:"auto 0"}}>GHC5</p>
          </div>
          <div style={{ width: "100%", display: "flex", justifyContent:"space-between"}}>
            <h3>
              Total
            </h3>
            <h3>
              GHC200
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