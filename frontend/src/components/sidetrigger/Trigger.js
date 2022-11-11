import React, { useState } from 'react';
import {GiHamburgerMenu} from 'react-icons/gi';
import './Trigger.scss'

const Trigger = ({count,handleClick}) => {
    
  return (
    <div className='trigger-main' onClick={ event=> handleClick() }>
        <GiHamburgerMenu color='white' size='45'/>
        { count>0 && <div className='counter'>
            <p>{count}</p>
        </div>}
    </div>
  )
}

export default Trigger