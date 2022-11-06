import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import "./SideBarCard.scss";

const SideBarCard = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div id="sidecard-main">
      <Card>
        <Card.Img variant="top" src="food.jpg" />
        <Card.Body>
          <Card.Title>Rice Chicken</Card.Title>
          <Card.Text>GHC 30</Card.Text>
        </Card.Body>
      </Card>
      <div className="buttons">
        <Button variant="secondary" onClick={() => setQuantity(quantity - 1)}>-</Button>
        {quantity}
        <Button variant="secondary" onClick={() => setQuantity(quantity + 1)}>+</Button>
      </div>
    </div>
  );
};

export default SideBarCard;
