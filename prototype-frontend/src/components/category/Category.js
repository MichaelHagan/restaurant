import Card from 'react-bootstrap/Card';
import Media from 'react-media';
import './Category.scss';

const Category = ({title,background, handleClick}) => {
  return (
    <Card id='category-main' className="bg-dark text-white" onClick={event => handleClick(false,title)}>
      <Media query="(min-width:1080px)">
      {
        matches =>{
          if (matches){return <Card.Img src={`images/b${background}.jpg`} alt={title} style={{backgroundColor:"black", opacity:"0.7"}}/>}
        }
      }  
      </Media>

      <Media query="(max-width:1080px) and (min-width: 800px)">
      {
        matches =>{
          if (matches){return <Card.Img src={`images/m${background}.jpg`} alt={title} style={{backgroundColor:"black", opacity:"0.7"}}/>}
        }
      }  
      </Media>

      <Media query="(max-width:800px)">
      {
        matches =>{
          if (matches){return <Card.Img src={`images/s${background}.jpg`} alt={title} style={{backgroundColor:"black", opacity:"0.7"}}/>}
        }
      }  
      </Media>

      <Card.ImgOverlay>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Text that describes the given category
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

export default Category;