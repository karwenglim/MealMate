'use client';
import React, { useState } from 'react';
import {
  getOrders,
  getAllTotal,
  getPaymentMethod,
} from '@/lib/features/user/userSlice';
import { useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import StarRatings from 'react-star-ratings';

function PurchaseOrdersPage() {
  const orders = useAppSelector(getOrders);
  const totalPaid = useAppSelector(getAllTotal);
  const paymentMethod = useAppSelector(getPaymentMethod);

  const [receivedOrders, setReceivedOrders] = useState<{
    [key: string]: number;
  }>({});

  const handleReceive = (orderId: string) => {
    setReceivedOrders((prev) => ({ ...prev, [orderId]: 0 }));
  };

  const handleRate = (orderId: string, rating: number) => {
    setReceivedOrders((prev) => ({ ...prev, [orderId]: rating }));
  };

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
                Order ID : {order.orderId}
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
            <div className='flex'>
              <div className='text-lg text-gray-500 font-semibold'>
                Receive Status
              </div>
            </div>
          </div>
          <div className='flex flex-row items-center'>
            <div className='flex basis-[60%]'>
              <div className='flex flex-row items-center gap-4'>
                <Image
                  src={order.image[0]}
                  alt='orderImg'
                  width={80}
                  height={80}
                  className='rounded-lg'
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
              </div>
            </div>
            <div className='flex basis-[20%] items-center text-center'>
              <div className='text-green-600 text-xl'>
                Amount : RM{order.quantity * order.price}
              </div>
            </div>

            <div className='flex basis-[10%] items-center justify-center'>
              {!receivedOrders.hasOwnProperty(order.orderId) ? (
                <button
                  onClick={() => handleReceive(order.orderId)}
                  className='cursor-pointer bg-green-400 rounded-xl py-3 px-5 text-white hover:bg-green-300'>
                  Received
                </button>
              ) : receivedOrders[order.orderId] === 0 ? (
                <StarRatings
                  rating={0}
                  starRatedColor='gold'
                  starHoverColor='orange'
                  changeRating={(rating) => handleRate(order.orderId, rating)}
                  numberOfStars={5}
                  name={`rating-${order.orderId}`}
                  starDimension='25px'
                  starSpacing='2px'
                />
              ) : (
                <StarRatings
                  rating={receivedOrders[order.orderId]}
                  starRatedColor='gold'
                  numberOfStars={5}
                  name={`rating-${order.orderId}`}
                  starDimension='25px'
                  starSpacing='2px'
                />
              )}
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
