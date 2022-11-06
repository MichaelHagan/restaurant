// import React from 'react';
// import './Card.scss';

// const Card = () => {
//   return (

//     <div id='card-main'>
//         <img src='food.jpg'/>
//         <p>
//          Food Text
//         </p>
//     </div>
  
//   )
// }

// export default Card


import Card from 'react-bootstrap/Card';
import './Card.scss';

const Card1 = () => {
  return (
    <div id='card-main'>
    <Card >
      <Card.Img variant="top" src="food.jpg" />
      <Card.Body>
        <Card.Title>Rice Chicken</Card.Title>
        <Card.Text>
          Explains Ingredients
        </Card.Text>
        <Card.Title>GHC 30</Card.Title>
      </Card.Body>
    </Card>
    </div>
  );
}

export default Card1;