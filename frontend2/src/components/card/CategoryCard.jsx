import React from 'react'

function 
CategoryCard({image, title, description, handleClick}) {
  return (
      <div className='shadow-md rounded-xl shadow-[#957bcb] hover:scale-110 ease-in duration-300'>
          <figure><img src={image}  alt="Shoes" /></figure>
          <div className="card-body">
              <h2 className="card-title text-gray-600">{title}</h2>
              <p className='text-left'>{description}</p>
              <div className="card-actions justify-end">
                  <button onClick={()=> 
                  handleClick(false,title)
                  } className="btn btn-warning">View meals</button>
              </div>              
          </div>
    </div>
  )
}

export default CategoryCard