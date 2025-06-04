'use client';
import React, { useEffect } from 'react';
import {
  getOrders,
  getAllTotal,
  getPaymentMethod,
  removeProductFromCart,
} from '@/lib/features/user/userSlice';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import Image from 'next/image';
import StarRatings from 'react-star-ratings';

// Assuming you have Redux actions to update order status and rating
import { setOrderStatus, setOrderRating } from '@/lib/features/user/userSlice'; // ← implement these if not yet done

function PurchaseOrdersPage() {
  const formatPrice = (amount: number) => amount.toFixed(2);
  const orders = useAppSelector(getOrders);
  const totalPaid = formatPrice(useAppSelector(getAllTotal));
  console.log(totalPaid);
  const paymentMethod = useAppSelector(getPaymentMethod);
  const dispatch = useAppDispatch();

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Simulate order status progression only for new orders
  useEffect(() => {
    const updateStatuses = async () => {
      for (const order of orders) {
        if (!order.status || order.status === 'Placed') {
          await sleep(10000);
          dispatch(
            setOrderStatus({
              orderId: order.orderId,
              status: 'Searching for Rider...',
            })
          );
          await sleep(10000);
          dispatch(
            setOrderStatus({ orderId: order.orderId, status: 'Found Rider!' })
          );
          await sleep(10000);
          dispatch(
            setOrderStatus({
              orderId: order.orderId,
              status: 'Out for Delivery',
            })
          );
        }
      }
    };
    updateStatuses();
  }, [orders, dispatch]);

  // const handleReceive = (orderId: string) => {
  //   dispatch(setOrderStatus({ orderId, status: 'Delivered' }));

  // };

  const handleReceive = (orderId: string) => {
    const order = orders.find((o) => o.orderId === orderId); // ✅ find the matching order first

    dispatch(setOrderStatus({ orderId, status: 'Delivered' })); // Optional if you have this reducer

    if (order) {
      dispatch(removeProductFromCart(order)); // ✅ Remove from cart
      // setReceivedOrders((prev) => ({ ...prev, [orderId]: 0 })); // ✅ Mark as received locally
    }
  };

  const handleRate = (orderId: string, rating: number) => {
    dispatch(setOrderRating({ orderId, givenRatings: rating }));
  };

  return (
    <div className='py-15 px-30 justify-between flex flex-col gap-20 w-full '>
      <div className='text-4xl text-[#36415F]'>My Orders</div>
      {orders.map((order) => (
        <div
          key={order.orderId}
          className='flex flex-col border-slate-300 rounded-lg border p-8'>
          <div className='flex flex-row'>
            <div className='flex basis-[40%]'>
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
                Total Amount : RM{formatPrice(order.quantity * order.price)}
              </div>
            </div>
            <div className='flex flex-1 justify-center'>
              <div className='text-lg text-gray-500 font-semibold'>
                Receive Status
              </div>
            </div>
          </div>
          <div className='flex flex-row items-center'>
            <div className='flex basis-[40%]'>
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
                <div>Order Status : {order.status || 'Placed'}</div>
                <div>Order Date : {order.date}</div>
              </div>
            </div>
            <div className='flex basis-[20%] items-center text-center'>
              <div className='text-green-600 text-xl'>
                Amount : RM{formatPrice(order.quantity * order.price)}
              </div>
            </div>

            <div className='flex flex-1 items-center justify-center'>
              {order.status !== 'Delivered' ? (
                <button
                  onClick={() => handleReceive(order.orderId)}
                  disabled={order.status !== 'Out for Delivery'}
                  className='cursor-pointer bg-green-400 rounded-xl py-3 px-5 text-white hover:bg-green-300 disabled:text-slate-500 disabled:bg-gray-400'>
                  Received
                </button>
              ) : order.givenRatings == null ? (
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
                  rating={order.givenRatings}
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
        Total Amount Paid :{' '}
        <span className='text-green-700'> RM{totalPaid}</span>
      </div>
    </div>
  );
}

export default PurchaseOrdersPage;
