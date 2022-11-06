import React from 'react';
import './SideBar.scss';
import Card from '../card/Card1';
import SideBarCard from '../card/SideBarCard';
import OrderModal from '../modals/OrderModal';

const SideBar = () => {

  return (
    <div className='sidebar-main'>
        <SideBarCard />
        <SideBarCard />
        <SideBarCard />
        <SideBarCard />
        <SideBarCard />
        <SideBarCard />
        <OrderModal />
    </div>
  )
}

export default SideBar