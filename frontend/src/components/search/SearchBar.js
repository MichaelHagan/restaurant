import React from 'react';
import './SearchBar.scss';
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ Search }) => {

  return (
      <div className='col-span-2 w-full h-auto'>
          <div className='mt-8'>
            <div className='grid md:grid-cols-2 gap-4 w-full py-2'>
              <div className='flex flex-col'>
                <input className='border-2 relative bg-transparent text-slate-200 rounded-full p-2 flex border-yellow-300'
                placeholder='Search food' onInput={e => {
                  Search(e.target.value);
                }}          
                />
              </div>
             
            </div>
          </div>
        </div> 
  )
}

export default SearchBar;