'use client';
import React from 'react';
import {
  getOrders,
  getAllTotal,
  getPaymentMethod,
} from '@/lib/features/user/userSlice';
import { useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
function PurchaseOrdersPage() {
  const orders = useAppSelector(getOrders);
  const totalPaid = useAppSelector(getAllTotal);
  const paymentMethod = useAppSelector(getPaymentMethod);
  return (
    <div className='py-15 px-30 justify-between flex flex-col gap-20 w-full '>
      <div className='text-4xl text-[#36415F]'>My Orders</div>
      {orders.map((order) => (
        <div
          key={order.orderId}
          className='flex flex-col border-slate-300 rounded-lg border p-8'>
          <div className='flex flex-row'>
            <div className='flex basis-[60%]'>
              <div className='text-lg text-gray-500 font-semibold'>
                {' '}
                Order ID : {order.orderId}{' '}
              </div>
            </div>
            <div className='flex basis-[20%]'>
              <div className='text-lg text-gray-500 font-semibold'>
                Payment : {paymentMethod}
              </div>
            </div>
            <div className='flex basis-[20%]'>
              <div className='text-lg text-gray-500 font-semibold'>
                Total Amount : RM{order.quantity * order.price}
              </div>
            </div>
          </div>
          <div className='flex flex-row items-center'>
            <div className='flex basis-[60%]'>
              <div className='flex flex-row items-center'>
                <Image
                  src={order.image[0]}
                  alt='orderImg'
                  className='h-50 w-50'
                />
                <div className='flex flex-col'>
                  <div className='text-xl'>{order.name}</div>
                  <div className='text-gray-500'>
                    Category : {order.category}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex basis-[20%]'>
              <div className='flex flex-col text-gray-500 text-lg'>
                <div>Quantity : {order.quantity}</div>
                <div>Order Status : Placed</div>
                <div>Order Date : {order.date}</div>
              </div>{' '}
            </div>
            <div className='flex basis-[20%] items-center text-center'>
              <div className='text-green-600 items-center text-center text-xl'>
                Amount : RM{order.quantity * order.price}
              </div>{' '}
            </div>
          </div>
        </div>
      ))}
      <div className='flex text-3xl justify-end '>
        Total Amount Paid : {'  '}
        <span className='text-green-700'>RM{totalPaid}</span>
      </div>
    </div>
  );
}

export default PurchaseOrdersPage;
