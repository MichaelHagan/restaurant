import React from 'react'
import Image from "../../images/about.jpg"

function about() {
  return (
      <div id="about" className='w-full h-full md:h-screen lg:h-screen'>
          <hr />
          <div className='max-w-[1240px] m-auto md:grid grid-cols-3 gap-8 justify-center px-2 py-24'> 
              <div className='col-span-2 py-24'>
                  <p className='text-3xl text-gray-600 font-bold inline border-b-4 border-yellow-300'>About</p>
                  <p className='py-4 text-gray-600'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Dignissimos illo commodi repellendus a, nihil nam voluptatibus illum sit accusamus cumque est
                      corporis atque quaerat iste rerum nesciunt fugiat!
                      Facere, ad.
                      
                  </p>
                  <p className='py-4 text-gray-600'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Dignissimos illo commodi repellendus a, nihil nam voluptatibus illum sit accusamus cumque est
                      corporis atque quaerat iste rerum nesciunt fugiat!
                      Facere, ad.
                  </p>
              </div>   
              <div className='w-full h-auto m-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center p-4 hover:scale-105 ease-in duration-300'>
                  <img src={Image} alt="about" className='rounded-xl' />
              </div>
          </div>         
    </div>
  )
}

export default about