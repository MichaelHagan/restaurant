import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import SideBar from '../components/sidebar/SideBar';
import SearchBar from '../components/search/SearchBar';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Category from '../components/category/Category';
import CategoryList from '../components/categorylist/CategoryList';
import './Home.scss';

const Home = () => {
  const [bl, setbl] = useState(true);
  const [heading, setHeading] = useState("");
  const [sidebar,setSidebar] = useState(false);
  const [foodlist,setFoodlist] = useState([
  {id:1,name:"Rice",desc:"Nicely prepared",price:30},
  {id:2,name:"Rice Chicken",desc:"Nicely prepared",price:30},
  {id:3,name:"Rice Chicken",desc:"Nicely prepared",price:30},
  {id:4,name:"Rice Chicken",desc:"Nicely prepared",price:30},
  {id:5,name:"Rice Chicken",desc:"Nicely prepared",price:30},
  {id:6,name:"Rice Chicken",desc:"Nicely prepared",price:30},
  {id:7,name:"Rice Chicken",desc:"Nicely prepared",price:30},
  {id:8,name:"Rice Chicken",desc:"Nicely prepared",price:30},
  {id:9,name:"Rice Chicken",desc:"Nicely prepared",price:30},
  {id:10,name:"Rice Chicken",desc:"Nicely prepared",price:30},
  {id:11,name:"Rice Chicken",desc:"Nicely prepared",price:30},
  {id:12,name:"Rice Chicken",desc:"Nicely prepared",price:30},
  {id:13,name:"Rice Chicken",desc:"Nicely prepared",price:30},
  {id:14,name:"Rice Chicken",desc:"Nicely prepared",price:30},
  {id:15,name:"Rice Chicken",desc:"Nicely prepared",price:30},
  {id:16,name:"Rice Chicken",desc:"Nicely prepared",price:30},
  {id:17,name:"Rice Chicken",desc:"Nicely prepared",price:30}]);
  const [selectedfoods,setSelectedfoods] = useState([]);
  const handleClick = (bool,header) =>{
    setbl(bool);
    setHeading(header);
  }

  const showSide=()=>{
    setSidebar(!sidebar);
  }

  const updateQuantity = (id,effect) =>{
    for(let i=0;i<selectedfoods.length;i++){
      if(id == selectedfoods[i].id){
        effect?selectedfoods[i].quantity++ : selectedfoods[i].quantity--;
      }
    }
    setSelectedfoods([...selectedfoods]);
  }

  const addSelected = (selected) =>{
  let notexist=true; 
  
  selectedfoods.forEach(element => {
    if(element.id===selected.id){
      notexist = false;
    }
  });  
    
  if(notexist){
    setSelectedfoods([...selectedfoods, {...selected, quantity:1}])
  }

}

  const removeSelected = (id) =>{
    setSelectedfoods(selectedfoods.filter(el=>el.id!=id));
  }


  return (
    <div id="home-main">
      {sidebar&&<SideBar List={selectedfoods} remove={removeSelected} updateQuantity={updateQuantity}/>}
      <div className="main-page">
        <Header handleClick={showSide} count={selectedfoods.length} />
        <div className="body">
          <SearchBar />
          {bl? 
          <div className="categories">
            <Category handleClick={handleClick} title={"Breakfast"} background={"breakfast"} />
            <Category handleClick={handleClick} title={"Dessert"} background={"dessert"} />
            <Category handleClick={handleClick} title={"Local"} background={"local"} />
            <Category handleClick={handleClick} title={"Continental"} background={"continental"} />
          </div>:
          <div> 
          <Button variant="outline-secondary"
            onClick={()=>setbl(!bl)}>
            Back
          </Button>
           <CategoryList Category={heading} List={foodlist} selectHandler={addSelected} />
          </div> 
           }
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;