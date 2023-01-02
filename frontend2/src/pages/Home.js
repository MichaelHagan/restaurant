import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import SideBar from '../components/sidebar/SideBar';
import SearchBar from '../components/search/SearchBar';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Category from '../components/category/Category';
import CategoryList from '../components/categorylist/CategoryList';
import './Home.scss';
import Navbar  from '../components/navbar/Navbar';

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
      if(id === selectedfoods[i].id){
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
    setSelectedfoods(selectedfoods.filter(el=>el.id!==id));
  }

  const clearOrders = () =>{
  setSelectedfoods([]);
  }


  return (
  
    <div id="home-main">
      {sidebar&&<SideBar 
      List={selectedfoods} 
      remove={removeSelected} 
      updateQuantity={updateQuantity}
      clearOrders = {clearOrders}
      />}
      <div className="main-page">
        <Navbar />
        <Header handleClick={showSide} count={selectedfoods.length} />
        <div className="body">
          {/* <SearchBar /> */}
          {bl? 
          <div className="categories">
            <Category handleClick={handleClick} title={"Breakfast"} background="./images/breakfast.png" description="this is a description" />
              <Category handleClick={handleClick} title={"Dessert"} background="./images/breakfast.png" description="this is a description" />
              <Category handleClick={handleClick} title={"Local"} background="./images/breakfast.png" description="this is a description" />
              <Category handleClick={handleClick} title={"Continental"} background="./images/breakfast.png" description="this is a description" />
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
        {/* <Footer /> */}
      </div>
     </div>
  );
};

export default Home;