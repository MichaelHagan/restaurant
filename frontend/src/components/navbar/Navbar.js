import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../../images/logo.png";
import Trigger from "../sidetrigger/Trigger";
import Cart from '../cart/Cart';

function Navbar({ count, goBack, List, updateQuantity, remove, clearOrders, handleLinkClick }) {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [showCart, setShowCart] = useState(false)
  const handleOpen = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);


  return (
    <div
      className={
        shadow
          ? "w-full h-[80px] z-10 bg-zinc-100 fixed drop-shadow-lg"
          : "w-full h-[80px] z-10 bg-zinc-100 fixed"
      }
    >
      <div className="max-w-[1240px] flex justify-between mx-auto items-center w-full h-full px-2 2xl:px-16">
        <div
          className="cursor-pointer"
          onClick={() => {
            goBack();
          }}
        >
          <img src={logo} alt="logo" width="100" height="100" className="" />
        </div>
        <div className="md:flex">
          <ul className="hidden md:flex text-black">
            <li className="ml-10 text-sm  uppercase border-b-2 cursor-pointer hover:border-yellow-400">
              <button onClick={handleLinkClick('home')} aria-label="Home">
                Home
              </button>
            </li>
            <li className="ml-10 text-sm uppercase hover:border-b-2 cursor-pointer hover:border-yellow-400">
              <button onClick={handleLinkClick('meals')} aria-label="Meals">
                Meals
              </button>
            </li>
            <li className="ml-10 text-sm  uppercase hover:border-b-2 cursor-pointer hover:border-yellow-400">
              <button
                onClick={handleLinkClick('about')}
                aria-label="About"
              >
                About
              </button>
            </li>
            <li className="ml-10 text-sm  uppercase hover:border-b-2 cursor-pointer hover:border-yellow-400">
              <button
                onClick={handleLinkClick('contact')}
                aria-label="Contact"
              >
                Contact
              </button>
            </li>
            <li className="text-black">
              <p className="ml-10">
                <Trigger count={count} setShowCart={setShowCart} />
                {showCart && (
                  <Cart
                    clearOrders={clearOrders}
                    setShowCart={setShowCart}
                    count={count}
                    List={List}
                    updateQuantity={updateQuantity}
                    remove={remove}
                  />
                )}
              </p>
            </li>
          </ul>

          <div onClick={handleOpen} className="md:hidden">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>
      {/* MOBILE MENU */}
      <div
        className={
          nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? "md:hidden fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <a href="/">
                <img
                  src={logo}
                  alt="logo"
                  width="100"
                  height="100"
                  className=""
                />
              </a>
              <div
                onClick={handleOpen}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              >
                <AiOutlineClose size={25} />
              </div>
            </div>
            <div className="border-b border-yellow-400 my-4">
              <p className="w-[85%] md:w-[90%] py-4 text-black">
                For all local and continental dishes
              </p>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            <ul className={`uppercase text-black ${nav ? 'block' : 'hidden'}`}>
              <li onClick={handleLinkClick('home')} className="py-4 text-sm">
                Home
              </li>
              <li onClick={handleLinkClick('meals')} className="py-4 text-sm">
                Meals
              </li>
              <li onClick={handleLinkClick('about')} className="py-4 text-sm">
                About
              </li>
              <li onClick={handleLinkClick('contact')} className="py-4 text-sm">
                Contact
              </li>
              <li className="text-black">
                <p className="ml-10">
                  <Trigger count={count} setShowCart={setShowCart} />
                  {showCart && <Cart
                    clearOrders={clearOrders}
                    setShowCart={setShowCart}
                    count={count}
                    List={List}
                    updateQuantity={updateQuantity}
                    remove={remove}
                  />}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
