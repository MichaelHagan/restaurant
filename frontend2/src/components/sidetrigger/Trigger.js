import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'

import './Trigger.scss'

const Trigger = ({count,handleClick}) => {
    
  return (
    <div className='' onClick={ event=> handleClick() }>
      <FaShoppingCart className="cursor-pointer border-none bg-transparent hover:scale-110 ease-in duration-300"   
        size={20} />
        {count>0 && count<=99?
        <div className='relative'>
          <p className='absolute  bg-red-500 text-white rounded-full text-center right-[-10px]
            text-sm w-full top-[-30px]'>{count}</p>
        </div>:<div>
          {count > 0 ? <div className='absolute bg-red-500 text-white rounded-full text-center right-[-20px]
            text-sm max-w-[1000px] top-[-35px]'><p>99+</p></div>:<div></div>}
        </div>
      }
    </div>
  )
}

export default Trigger