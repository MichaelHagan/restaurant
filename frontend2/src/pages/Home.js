import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import SideBar from "../components/sidebar/SideBar";
import SearchBar from "../components/search/SearchBar";
import Header from "../components/header/Header";
import Category from "../components/category/Category";
import CategoryList from "../components/categorylist/CategoryList";
import About from "../components/about/About";
import Footer from "../components/footer/Footer";
import Contact from "../components/contact/Contact";
import Navbar from "../components/navbar/Navbar";

const Home = () => {
  const baseURL = "http://localhost:3050";
  const [bl, setbl] = useState(true);
  const [heading, setHeading] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const [foodlist, setFoodlist] = useState([]);
  const [selectedfoods, setSelectedfoods] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchFoodList, setsearchFoodList] = useState([]);

  useEffect(() => {
    axios.get(baseURL + "/foods").then((response) => {
      setFoodlist(response.data);
    });
  }, []);

  const handleClick = (bool, header) => {
    setbl(bool);
    setHeading(header);
  };

  const showSide = () => {
    setSidebar(!sidebar);
  };

  const updateQuantity = (id, effect) => {
    for (let i = 0; i < selectedfoods.length; i++) {
      if (id === selectedfoods[i].id) {
        effect ? selectedfoods[i].quantity++ : selectedfoods[i].quantity--;
      }
    }
    setSelectedfoods([...selectedfoods]);
  };

  const addSelected = (selected) => {
    let notexist = true;

    selectedfoods.forEach((element) => {
      if (element.id === selected.id) {
        notexist = false;
      }
    });

    if (notexist && selected.available) {
      setSelectedfoods([...selectedfoods, { ...selected, quantity: 1 }]);
    }
  };

  const removeSelected = (id) => {
    setSelectedfoods(selectedfoods.filter((el) => el.id !== id));
  };

  const clearOrders = () => {
    setSelectedfoods([]);
  };

  const goBack = () => {
    setbl(true);
  };

  const search = (search) => {
    let trimmedVal = search.replace(" ", "").toLowerCase().trim();
    if (trimmedVal) {
      setIsSearch(true);
    }
    setsearchFoodList(
      foodlist.filter((el) =>
        el.name.replace(" ", "").toLowerCase().includes(trimmedVal)
      )
    );
  };

  return (
    <div>
      <div>
        <Navbar
          handleClick={showSide}
          goBack={goBack}
          count={selectedfoods.length}
          List={selectedfoods}
          remove={removeSelected}
          updateQuantity={updateQuantity}
          clearOrders={clearOrders}
        />
        {bl ? (
          <div>
            <Header />
            <Category handleClick={handleClick} />
            <About />
            <Contact />
          </div>
        ) : (
          <div>
            <Button variant="outline-secondary" onClick={() => setbl(!bl)}>
              Back
            </Button>
            <SearchBar Search={search} />
            <CategoryList
              Category={heading}
              List={
                isSearch
                  ? searchFoodList.filter((el) => el.category === heading)
                  : foodlist.filter((el) => el.category === heading)
              }
              selectHandler={addSelected}
            />
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
