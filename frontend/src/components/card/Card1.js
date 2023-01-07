import Card from 'react-bootstrap/Card';
import './Card.scss';

const Card1 = ({id,name,desc,price,available}) => {
  

  return (
    <div id='card-main'> 
    <Card >
    <div className={available?'':'overlay'}> 
      <Card.Img variant="top" src="food.jpg" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {desc}
        </Card.Text>
        <Card.Title>GHC{price}</Card.Title>
        <h5>Unavailable</h5>
      </Card.Body>
      </div>  
    </Card>
    </div>
  );
}

export default Card1;