import { useState, useEffect } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import SideBar from '../components/sidebar/SideBar';
import SearchBar from '../components/search/SearchBar';
import Header from '../components/header/Header';
import Category from '../components/category/Category';
import CategoryList from '../components/categorylist/CategoryList';
import About from '../components/about/About';
import Footer from '../components/footer/Footer';
import Contact from '../components/contact/Contact';
import './Home.scss';
import Navbar  from '../components/navbar/Navbar';

const Home = () => {
  const [bl, setbl] = useState(true);
  const [heading, setHeading] = useState("");
  const [sidebar,setSidebar] = useState(false);
  const baseURL = "http://localhost:3050";
  const [foodlist,setFoodlist] = useState([]);

useEffect(() => {
  axios.get(baseURL+"/foods").then((response) => {
    setFoodlist(response.data);
  });
}, []);
  
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
    
  if(notexist && selected.available){
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
  
    <div>
      {sidebar&&<SideBar 
      List={selectedfoods} 
      remove={removeSelected} 
      updateQuantity={updateQuantity}
      clearOrders = {clearOrders}
      />}
      <div>
        <Navbar handleClick={showSide} count={selectedfoods.length}/>
          {bl? 
          <div>
            <Header />
            <Category handleClick={handleClick} />
            <About />
            <Contact />
          </div>:
          <div> 
          <Button variant="outline-secondary"
            onClick={()=>setbl(!bl)}>
            Back
          </Button>
           <CategoryList Category={heading} List={foodlist.filter(el=>el.category===heading)} selectHandler={addSelected} />
          </div> 
           }
        <Footer />
      </div>
     </div>
  );
};

export default Home;