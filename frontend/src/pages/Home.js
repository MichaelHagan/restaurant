import { useState } from 'react';
import Card from '../components/card/Card1';
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
  // var bl =true;
  const handleClick = (bool,header) =>{
    setbl(bool);
    setHeading(header);
  }


  return (
    <div id="home-main">
      <SideBar />
      <div className="main-page">
        <Header />
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
          <button 
            onClick={()=>setbl(!bl)}>
            Back
          </button>
           <CategoryList Category={heading} List={[1,2,3,4,5,6,7,8,7,6,,5,4,4,4,4,4,4,1,2,3,4,5,6,7,8,7,6,,5,4,4,4,4,4,4,1,2,3,4,5,6,7,8,7,6,,5,4,4,4,4,4,4,1,2,3,4,5,6,7,8,7,6,,5,4,4,4,4,4,4]}/>
          </div> 
           }
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;