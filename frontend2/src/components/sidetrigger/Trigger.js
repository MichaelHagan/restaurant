import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'

import './Trigger.scss'

const Trigger = ({count,handleClick}) => {
    
  return (
    <div className='trigger-main' onClick={ event=> handleClick() }>
      <FaShoppingCart size={20} />
        {count>0 && <div className='counter'>
            <p>{count}</p>
      </div>
      }
    </div>
  )
}

export default Trigger