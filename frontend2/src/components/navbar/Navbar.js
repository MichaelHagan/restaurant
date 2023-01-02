import React, { useState, useEffect } from 'react'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
// import logo from "../../../public/local.png"


function Navbar() {

    const [nav, setNav] = useState(false)
    const [shadow, setShadow] = useState(false)
    const handleOpen = () => {
        setNav(!nav)
    }

    useEffect(() => {
        const handleShadow = () => {
            if (window.scrollY >= 90) {
                setShadow(true)
            } else {
                setShadow(false)
            }
        }
        window.addEventListener('scroll', handleShadow)
    }, [])

  return (
      <div className={shadow ? 'w-full h-[80px] z-10 bg-zinc-100 fixed drop-shadow-lg' : 'w-full h-[80px] z-10 bg-zinc-100 fixed'}
      >
          <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>
              {/* <li href="/"> */}
              <img  alt="logo" width="160" height="160" />
              {/* </li> */}
              <div>
                  <ul className='hidden md:flex text-black'>

                      <li href="/">
                          <li className='ml-10 text-sm  uppercase border-b-2 cursor-pointer hover:border-yellow-400'>Home</li>
                      </li>
                      <li href="/#meals" smooth={true} duration={300}>
                          <li className='ml-10 text-sm  uppercase hover:border-b-2 cursor-pointer hover:border-yellow-400'>Meals</li>
                      </li>
                      <li href="/#about">
                          <li className='ml-10 text-sm uppercase hover:border-b-2 cursor-pointer hover:border-yellow-400'>About</li>
                      </li>
                      
                  </ul>
                  <div onClick={handleOpen} className='md:hidden'>
                      <AiOutlineMenu size={25} />
                  </div>
              </div>
          </div>
          {/* MOBILE MENU */}
          <div className={nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70' : ''}>
              <div className={nav ? 'md:hidden fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500' : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'}>
                  <div>
                      <div className='flex w-full items-center justify-between'>
                          <h1 className='cursor-pointer font-fancy text-black'>OrderMe.</h1>
                          <div onClick={handleOpen} className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer'>
                              <AiOutlineClose size={25} />
                          </div>
                      </div>
                      <div className='border-b border-yellow-400 my-4'>
                          <p className='w-[85%] md:w-[90%] py-4 text-black'>For all local and continental dishes</p>
                      </div>
                  </div>
                  <div className="py-4 flex flex-col">
                      <ul className='uppercase text-black'>
                          <li href="/">
                              <li onClick={() => setNav(false)} className="py-4 text-sm ">
                                  Home
                              </li>
                          </li>
                          <li href="/#meals">
                              <li onClick={() => setNav(false)} className="py-4 text-sm">
                                  Meals
                              </li>
                          </li>
                          <li href="/#about">
                              <li onClick={() => setNav(false)} className="py-4 text-sm">
                                  About
                              </li>
                          </li>
                          
                      </ul>
                  
                  </div>
              </div>

          </div>
         
      </div>  )
}

export default Navbar