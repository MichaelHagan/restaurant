import React from 'react';
import './SideBar.scss';
import Card from '../card/Card1';
import SideBarCard from '../card/SideBarCard';
import OrderModal from '../modals/OrderModal';
import {GiFoodTruck} from "react-icons/gi";

const SideBar = ({List,remove,updateQuantity}) => {

  return (
    <div className="sidebar-main"> 
    {List.length >0 ?
    ( 
      <>
      {List.map((order) => (
        <div key={order.id}>
          <SideBarCard details={order}  remove={remove} updateQuantity={updateQuantity}/>
        </div>
      ))}
      <OrderModal orders={List}/>
      </>
    ):(
      <div className='empty'>
        <GiFoodTruck size={30}/>
        <h6>No food Selected</h6>
      </div>
    )
    }
    </div>
  );
};

export default SideBar