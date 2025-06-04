'use client';

import React, { useState } from 'react';
import { dummyOrders } from '../../../assets/images/assets';

const formatPrice = (amount: number) => amount.toFixed(2);
const COMMISSION_PERCENTAGE = 0.15;

type OrderWithLocation = (typeof dummyOrders)[0] & {
  dormLocation: string;
};

export default function RiderLandingPage() {
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const generateOrderWithLocation = (
    order: (typeof dummyOrders)[0]
  ): OrderWithLocation => ({
    ...order,
    dormLocation: `Kolej Kediaman 5`,
  });

  const initialOrders: OrderWithLocation[] = dummyOrders
    .slice(0, 6)
    .map(generateOrderWithLocation);

  const [availableOrders, setAvailableOrders] = useState<OrderWithLocation[]>(
    initialOrders.filter((o) => o.status === 'Order Placed')
  );
  const [pickedUpOrders, setPickedUpOrders] = useState<OrderWithLocation[]>(
    initialOrders.filter((o) => o.status === 'Picked Up')
  );
  const [deliveredOrders, setDeliveredOrders] = useState<OrderWithLocation[]>(
    initialOrders.filter((o) => o.status === 'Delivered')
  );

  const handlePickUp = (orderId: string) => {
    const order = availableOrders.find((o) => o._id === orderId);
    if (!order) return;
    const updatedOrder = { ...order, status: 'Picked Up' };
    setAvailableOrders(availableOrders.filter((o) => o._id !== orderId));
    setPickedUpOrders([updatedOrder, ...pickedUpOrders]);
  };

  const handleDeliver = (orderId: string) => {
    const order = pickedUpOrders.find((o) => o._id === orderId);
    if (!order) return;
    const updatedOrder = { ...order, status: 'Delivered' };
    setPickedUpOrders(pickedUpOrders.filter((o) => o._id !== orderId));
    setDeliveredOrders([updatedOrder, ...deliveredOrders]);
  };

  const OrderCard = ({
    order,
    showPickUp,
    showDeliverButton,
    onPickUp,
    onDeliver,
  }: {
    order: OrderWithLocation;
    showPickUp?: boolean;
    showDeliverButton?: boolean;
    onPickUp?: (id: string) => void;
    onDeliver?: (id: string) => void;
  }) => {
    const firstItem = order.items[0];
    const riderEarnings = order.amount * COMMISSION_PERCENTAGE;

    return (
      <div className='flex flex-row justify-between items-center border rounded-lg border-gray-300 mb-6 shadow-sm px-6 py-4 w-full gap-6'>
        {/* Left Section: Order ID & Date */}
        <div className='flex flex-col min-w-[180px]'>
          <div className='text-lg font-semibold text-gray-700'>
            Order ID: {order._id}
          </div>
          <div className='text-sm text-gray-500 mt-1'>
            {formatDate(order.createdAt)}
          </div>
        </div>

        {/* Middle Section: Product details */}
        <div className='flex flex-col flex-1'>
          <div className='text-xl font-semibold'>{firstItem.product.name}</div>
          <div className='text-gray-500'>
            Category: {firstItem.product.category}
          </div>
          <div className='text-gray-600 mt-1'>
            Quantity: {firstItem.quantity}
          </div>
          <div className='text-gray-600 mt-1'>
            Pickup Location: {order.dormLocation}
          </div>
          <div className='text-gray-600 mt-1'>
            Destination: Kolej Kediaman 8
          </div>
        </div>

        {/* Right Section: Amount, Earnings & Buttons */}
        <div className='flex flex-col items-end min-w-[160px] space-y-3'>
          <div className='text-green-600 font-bold text-lg'>
            Amount: RM{formatPrice(order.amount)}
          </div>
          <div className='text-blue-600 font-semibold'>
            Earnings (15%): RM{formatPrice(riderEarnings)}
          </div>
          <div className='flex gap-3'>
            {showPickUp && onPickUp && (
              <button
                onClick={() => onPickUp(order._id)}
                className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'>
                Pick Up
              </button>
            )}
            {showDeliverButton && onDeliver && (
              <button
                onClick={() => onDeliver(order._id)}
                className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'>
                Deliver
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h1 className='text-4xl font-bold mb-8 text-center'>Rider Dashboard</h1>

      <section className='mb-12'>
        <h2 className='text-2xl font-semibold mb-4'>Available Orders</h2>
        {availableOrders.length === 0 && (
          <p className='text-gray-500'>No available orders at the moment.</p>
        )}
        {availableOrders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            showPickUp
            onPickUp={handlePickUp}
          />
        ))}
      </section>

      <section className='mb-12'>
        <h2 className='text-2xl font-semibold mb-4'>Picked Up Orders</h2>
        {pickedUpOrders.length === 0 && (
          <p className='text-gray-500'>No picked up orders.</p>
        )}
        {pickedUpOrders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            showDeliverButton
            onDeliver={handleDeliver}
          />
        ))}
      </section>

      <section>
        <h2 className='text-2xl font-semibold mb-4'>Delivered Orders</h2>
        {deliveredOrders.length === 0 && (
          <p className='text-gray-500'>No delivered orders yet.</p>
        )}
        {deliveredOrders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
          />
        ))}
      </section>
    </div>
  );
}
