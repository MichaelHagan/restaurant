import React from 'react'
import './OrderModal.scss'

const ModalListElement = ({name,quantity,total}) => {
  return (
    <div id='modal-list-element'>
        <p className='quantity'>{quantity}</p>
        <p className='name'>{name}</p>
        <p className='total'>GHC{total}</p>
    </div>
  )
}

export default ModalListElement