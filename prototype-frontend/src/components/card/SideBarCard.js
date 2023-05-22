import React from "react";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import "./SideBarCard.scss";
import { MdOutlineCancel } from "react-icons/md";

const SideBarCard = ({details,remove,updateQuantity}) => {

  const increase=()=>{
    
    updateQuantity(details.id,true);
    
  }

  const decrease=()=>{
    if(details.quantity>1){
      updateQuantity(details.id,false);
    }
    
  }

  return (
    <div id="sidecard-main">
      <Card>
      <div className="icon" onClick={event=> remove(details.id)}>
        <MdOutlineCancel />
      </div>
        <Card.Img variant="top" src="food.jpg" />
        <Card.Body>
          <Card.Title>{details.name}</Card.Title>
          <Card.Text>GHC{details.price}</Card.Text>
        </Card.Body>
      </Card>
      <div className="buttons">
        <Button variant="secondary" onClick={() => decrease()}>-</Button>
        {details.quantity}
        <Button variant="secondary" onClick={() => increase()}>+</Button>
      </div>
    </div>
  );
};

export default SideBarCard;
