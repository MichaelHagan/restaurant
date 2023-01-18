import React from 'react';
import './SearchBar.scss';
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({Search}) => {

  return (
    <div id='searchbar-main'>
      <input placeholder='Search...' onInput={e=>{
        Search(e.target.value);
      }}>
      
      </input>
      <AiOutlineSearch />
    </div>
  )
}

export default SearchBar;