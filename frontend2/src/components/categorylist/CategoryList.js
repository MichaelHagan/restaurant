import React from "react";
import Card from '../card/Card';


const CategoryList = ({ Category, List, selectHandler }) => {

  return (
    <div className="w-full h-screen">
      <div className="max-w-[1240px] m-auto flex flex-col justify-center w-full px-2 py-24">
        <div>
        <h2 className="text-3xl text-gray-600 font-bold inline border-b-4 border-yellow-300">
          {Category}
        </h2>
        </div>
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 text-center py-8">
          {List.map((food) => (
            <div key={food.id}
              onClick={event => selectHandler(
                {
                  id: food.id,
                  name: food.name,
                  desc: food.description,
                  price: food.price,
                  available: food.available
                }
              )}
            >
              <Card
                id={food.id}
                name={food.name}
                desc={food.description}
                price={food.price}
                available={food.available}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
