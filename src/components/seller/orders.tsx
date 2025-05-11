import React from 'react';
import OrderCard from './orders/orderCard';
import { dummyOrders } from '../../../assets/images/assets';
const Orders = () => {
  return (
    <div className='flex flex-col gap-5 w-full'>
      <div className='text-[#36415F]  text-xl'>Order List</div>
      <div className='flex flex-col gap-10'>
        {dummyOrders.map((dummyOrder, index) => (
          <OrderCard
            key={index}
            order={dummyOrder}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
