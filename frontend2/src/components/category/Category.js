import React from 'react'
import CategoryCard from '../card/CategoryCard'
import breakfast from "../../images/breakfast-min.jpg"
import continental from "../../images/lunch-min.jpg"
import local from "../../images/local.jpg"
import dessert from "../../images/dessert-min.jpg"


function Category({handleClick}) {
  return (
    <div id="category" className='w-full h-screen'>
      <div className='max-w-[1240px] m-auto flex flex-col justify-center w-full px-2 py-24'>
        <div>
          <p className="text-3xl text-gray-600 font-bold inline border-b-4 border-yellow-300"> Food categories</p>
        </div>
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 text-center py-8">
          <CategoryCard
            image={breakfast}
            title="Breakfast"
            description="This is breakfast"
            handleClick={handleClick}
          />
          <CategoryCard
            image={continental}
            title="Continental"
            description="Continental something"
            handleClick={handleClick}
          />
          <CategoryCard
            image={local}
            title="Local"
            description="Local Something"
            handleClick={handleClick}
          />
          <CategoryCard
            image={dessert}
            title="Dessert"
            description="This is Dessert"
            handleClick={handleClick}
          />
        </div>
      </div>   
    </div>
  )
}

export default Category


