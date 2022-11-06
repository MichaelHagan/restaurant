import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const OrderModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);

  const switchModal = () =>{
    setShow(false);
    setShow2(true);
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
          <Form.Select defaultValue="No Delivery">
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
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display:"flex", flexDirection:"column", alignContent:"center"}}>
          <div className=''>          </div>
        </Modal.Body>
        <Modal.Footer
        style={{justifyContent:"center"}}
        >
          <Button variant="success">Place Order</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default OrderModal;