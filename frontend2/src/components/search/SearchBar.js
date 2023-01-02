import React from 'react';
import './SearchBar.scss';
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
  return (
    <div id='searchbar-main'>
      <input placeholder='Search...'>
      
      </input>
      <AiOutlineSearch />
    </div>
  )
}

export default SearchBar;