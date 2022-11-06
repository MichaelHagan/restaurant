import React from "react";
import './CategoryList.scss';
import Card from '../card/Card1';


const CategoryList = ({ Category, List }) => {
  return (
    <div id="categorylist-main">
     <h2>{Category}</h2>
     <div className="line">
        </div>      
     <div className="list-body">
      {List.map((food) => (
        <div key={food.id} 
        // onClick={() => }
        >
          <Card
          
          />
        </div>
      ))}
      </div>
    </div>
  );
};

export default CategoryList;
