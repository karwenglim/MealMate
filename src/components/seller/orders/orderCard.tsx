import React from 'react';
import { Product } from '@/types/Product';
import { assets } from '../../../../assets/images/assets';
import Image from 'next/image';
interface Item {
  product: Product;
  quantity: number;
  _id: string;
}

interface Address {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: number;
  country: string;
  phone: string;
}

interface OrderList {
  _id: string;
  userId: string;
  items: Item[];
  amount: number;
  address: Address;
  status: string;
  paymentType: string;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

// Correctly define the props type
interface OrderCardProps {
  order: OrderList;
}

const OrderCard = ({ order }: OrderCardProps) => {
  console.log(order);
  return (
    <div className='flex flex-row px-3 py-5 items-center justify-between rounded-xl border border-slate-300'>
      <div className='flex flex-row gap-5 basis-[30%] items-center'>
        <Image
          src={assets.box_icon}
          alt='productListIcon'
        />
        <div className='text-[#36415F] font-semibold'>
          {order.items[0].product.name}
        </div>

        <div className='text-green-500'>x{order.items[0].quantity}</div>
      </div>

      <div className='flex flex-col gap-1 text-[#36415F]'>
        <div className='font-semibold'>
          {order.address.firstName} {order.address.lastName}
        </div>
        <div>{order.address.street}</div>
        <div>
          {order.address.city}, {order.address.zipcode}
        </div>
        <div>{order.address.state}</div>
        <div>0{order.address.phone}</div>
      </div>

      <div className='text-xl font-semibold text-[#36415F]'>
        RM {order.amount}
      </div>

      <div className='flex flex-col text-[#36415F]'>
        <div>Method : {order.paymentType}</div>
        <div>Date : {order.updatedAt.slice(0, 10)}</div>
        <div>Payment : {order.isPaid ? 'Paid' : 'Pending'}</div>
      </div>
    </div>
  );
};

export default OrderCard;
