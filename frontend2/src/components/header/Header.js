import React from 'react'
import image from "../../images/background.jpg"
import { HiOutlineChevronDoubleDown } from "react-icons/hi"
import {FaSearch} from "react-icons/fa"
import Trigger from '../sidetrigger/Trigger'



const Header = ({ handleClick, count }) => {
  return (
    <div id="header" className='w-full h-screen'>
      <div className='hidden lg:flex flex-col w-full h-screen  bg-gray-900/90 absolute'>
        <img className='w-full h-full mix-blend-overlay' src={image} alt="support" />
      </div>
      <div className='max-w-[1240px] mx-auto p-4 flex flex-col justify-center items-center w-full h-full relative'>
        <div className='lg:text-white'>
          <h2 className='text-4xl'>Discover the best meals</h2>
          <p className=' text-center py-6'>The best meals at affordable prices</p>
        </div>
        <div className='col-span-2 w-full h-auto'>
          <div className='p-4'>
            <div className='grid md:grid-cols-2 gap-4 w-full py-2'>
              <div className='flex flex-col'>
                <input className='border-2 bg-transparent text-slate-200 rounded-lg p-3 flex border-yellow-300'
                placeholder='Search food'              
                />
              </div>
              <div className='flex flex-col'>
                <input className='border-2 bg-transparent text-slate-200 rounded-lg p-3 flex border-yellow-300'
                  placeholder='Search by category'
                />
              </div>
            </div>
          </div>
        </div> 
        <div className='flex justify-center mt-6'>
          <a href="/#category">
            <div className="rounded-full shadow-md bg-black shadow-yellow-300 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
              <HiOutlineChevronDoubleDown size={30} className="m-auto text-[#FDE047]" />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Header