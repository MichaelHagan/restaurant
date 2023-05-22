import React from 'react'
import './OrderModal.scss'

const ModalListElement = ({name,quantity,total}) => {
  return (
    <div className='modal-list-element'>
        <div className='container'>
        <p className='quantity'>{quantity}</p>
        <p className='name'>{name}</p>
        </div>
        <p className='total'>GHC{total}</p>
    </div>
  )
}

export default ModalListElement