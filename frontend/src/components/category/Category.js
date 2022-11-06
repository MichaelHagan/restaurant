import React from 'react';
import './Category.scss';

const Category = ({title,background, handleClick}) => {
  return (
    <div id='category-main' onClick={event => handleClick(false,title)} style={{backgroundImage: `url(images/${background}.jpg)`}}>
        <h2>{title}</h2>
    </div>
  )
}

export default Category