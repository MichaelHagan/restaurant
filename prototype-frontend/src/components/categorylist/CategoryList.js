import React from "react";
import './CategoryList.scss';
import Card from '../card/Card1';
import SearchBar from "../search/SearchBar";


const CategoryList = ({ Category, List, selectHandler }) => {

  return (
    <div id="categorylist-main">
     <h2>{Category}</h2>  
     <div className="list-body">
      {List.map((food) => (
        <div key={food.id} 
        onClick={event => selectHandler(
          {
            id:food.id,
            name:food.name,
            desc:food.description,
            price:food.price,
            available:food.available
          }
        ) }
        >
          <Card
          id = {food.id}
          name = {food.name}
          desc = {food.description}
          price = {food.price}
          available = {food.available}
          />
        </div>
        
      ))}
      </div>

    </div>
  );
};

export default CategoryList;
