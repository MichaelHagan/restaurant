import React, { useState, useEffect } from 'react'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import logo from "../../images/logo.png"


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
          <div className='max-w-[1240px] flex justify-between mx-auto items-center w-full h-full px-2 2xl:px-16'>
              <a href="/">
              <img src={logo} alt="logo" width="100" height="100" className='' />
              </a>
              <div>
                  <ul className='hidden md:flex text-black'>

                      <a href="/">
                          <li className='ml-10 text-sm  uppercase border-b-2 cursor-pointer hover:border-yellow-400'>Home</li>
                      </a>
                      <a href="/#meals" smooth={true} duration={300}>
                          <li className='ml-10 text-sm  uppercase hover:border-b-2 cursor-pointer hover:border-yellow-400'>Meals</li>
                      </a>
                      <a href="/#about">
                          <li className='ml-10 text-sm uppercase hover:border-b-2 cursor-pointer hover:border-yellow-400'>About</li>
                      </a>
                      
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
                          <a href="/">
                              <img src={logo} alt="logo" width="100" height="100" className='' />
                          </a>                          <div onClick={handleOpen} className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer'>
                              <AiOutlineClose size={25} />
                          </div>
                      </div>
                      <div className='border-b border-yellow-400 my-4'>
                          <p className='w-[85%] md:w-[90%] py-4 text-black'>For all local and continental dishes</p>
                      </div>
                  </div>
                  <div className="py-4 flex flex-col">
                      <ul className='uppercase text-black'>
                          <a href="/">
                              <li onClick={() => setNav(false)} className="py-4 text-sm ">
                                  Home
                              </li>
                          </a>
                          <a href="/#meals">
                              <li onClick={() => setNav(false)} className="py-4 text-sm">
                                  Meals
                              </li>
                          </a>
                          <a href="/#about">
                              <li onClick={() => setNav(false)} className="py-4 text-sm">
                                  About
                              </li>
                          </a>
                          
                      </ul>
                  
                  </div>
              </div>

          </div>
         
      </div>  )
}

export default Navbar