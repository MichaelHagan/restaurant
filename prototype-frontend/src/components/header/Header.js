import React from 'react'
import './Header.scss'
import Trigger from '../sidetrigger/Trigger'

const Header = ({handleClick, count}) => {
  return (
    <div id='header-main'>
      <Trigger handleClick={handleClick} count={count}/>
        <h1>Welcome</h1>
    </div>
  )
}

export default Header