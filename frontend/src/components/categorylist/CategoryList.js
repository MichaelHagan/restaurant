import React from "react";
import Card from '../card/Card';
import SearchBar from '../search/SearchBar'
import NoFoodComponent from './nofood/NoFoodComponent'


const CategoryList = ({ Category, List, selectHandler, search }) => {

  return (
    <div className="w-full h-full">
      <div className="max-w-[1240px] m-auto flex flex-col justify-center h-full px-2 py-24">
        <div>
        <h2 className="text-3xl text-gray-600 font-bold inline border-b-4 border-yellow-300">
          {Category}
        </h2>
        </div>
        <SearchBar Search={search} />
        {List.length?
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center py-8">
          {List.map((food) => (
            <div key={food.id}
              onClick={event => selectHandler(
                {
                  id: food.id,
                  name: food.name,
                  desc: food.description,
                  price: food.price,
                  available: food.available,
                  image: food.imageUrl
                }
              )}
            >
              <Card
                id={food.id}
                name={food.name}
                desc={food.description}
                price={food.price}
                available={food.available}
                image = {food.imageUrl}
              />
            </div>
          ))}
        </div>:
        <div>
          <NoFoodComponent /> 
        </div>
        }
      </div>
    </div>
  );
};

export default CategoryList;
