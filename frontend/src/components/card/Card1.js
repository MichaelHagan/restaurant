import Card from 'react-bootstrap/Card';
import './Card.scss';

const Card1 = ({id,name,desc,price}) => {
  return (
    <div id='card-main'>
    <Card >
      <Card.Img variant="top" src="food.jpg" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {desc}
        </Card.Text>
        <Card.Title>GHC{price}</Card.Title>
      </Card.Body>
    </Card>
    </div>
  );
}

export default Card1;