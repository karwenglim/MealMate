'use client';
import React, { useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  removeProductFromCart,
  removeFromCart,
  addToOrders,
  setPaymentMethod,
} from '@/lib/features/user/userSlice';
import {
  getTotalQty,
  getCart,
  ProductInCart,
  getAllSubtotal,
  getAllTotal,
  getUserDeliveryFee,
  getTotalTax,
  getAddress,
} from '@/lib/features/user/userSlice';
import Image from 'next/image';
import { assets } from '../../../assets/images/assets';
import { useRouter } from 'next/navigation';

function CartPage() {
  const dispatch = useDispatch();
  const totalQty = useAppSelector(getTotalQty);
  const cart = useAppSelector(getCart);
  const allSubtotal = useAppSelector(getAllSubtotal);
  const allTotal = useAppSelector(getAllTotal);
  const deliveryFee = useAppSelector(getUserDeliveryFee);
  const totalTax = useAppSelector(getTotalTax);
  const address = useAppSelector(getAddress);
  const router = useRouter();
  const [preferredPaymentMethod, setPreferredPaymentMethod] =
    useState<string>('Cash On Delivery');
  const handleAddQuantity = (cartItem: ProductInCart) => {
    dispatch(addToCart(cartItem));
  };

  const handleRemoveButton = (cartItem: ProductInCart) => {
    dispatch(removeProductFromCart(cartItem));
  };

  const handleReduceQty = (cartItem: ProductInCart) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleAddAddress = () => {
    router.push('/add-address');
  };

  const handleButtonClick = () => {
    if (cart.length === 0) {
      console.error('cart is empty');
      return;
    }

    if (address.city === '') {
      console.error('No address');
      return;
    }

    for (const item of cart) {
      dispatch(addToOrders(item));
    }
    dispatch(setPaymentMethod(preferredPaymentMethod));
    router.push('/my-orders');
  };
  return (
    <div className='py-15 px-30 justify-between flex flex-row gap-10 w-full'>
      <div className='flex flex-col gap-10 basis-[70%]'>
        {/*On top is the entire div housing the left side */}
        <div className='flex flex-row gap-3 items-baseline'>
          {/*On top is the entire div housing the Title and Qty */}
          <div className='text-4xl text-[#36415F]'>Shopping Cart</div>
          <div className='text-green-600 font-semibold'>{totalQty} Items</div>
        </div>
        <div className='flex flex-col gap-8 w-full'>
          <div className='flex flex-row  text-gray-500 text-lg w-full'>
            <div className='flex basis-[60%] font-semibold '>Product</div>
            <div className='flex flex-row basis-[20%] font-semibold justify-center'>
              Subtotal
            </div>
            <div className='flex basis-[20%] font-semibold justify-center'>
              Action
            </div>
          </div>
          <div className='flex flex-col  w-full'>
            {cart.map((cartItem) => (
              <div
                key={cartItem._id}
                className='flex flex-row w-full  p-2 items-center'>
                <div className='flex flex-row gap-5 basis-[60%] items-center'>
                  <div className='w-30 h-30 border border-slate-300 rounded-lg'>
                    <Image
                      src={cartItem.image[0]}
                      className='w-full h-full'
                      alt='cartItemImg'
                    />
                  </div>
                  <div className='flex flex-col gap-2 text-xl '>
                    <div className='font-semibold'>Name : {cartItem.name}</div>
                    <div className='text-xl text-gray-500'>
                      Quantity : {cartItem.quantity}
                    </div>
                    <div className='flex flex-row border w-max gap-5 py-2 px-4 rounded-lg border-slate-300'>
                      <div onClick={() => handleReduceQty(cartItem)}>-</div>
                      <div>{cartItem.quantity}</div>
                      <div onClick={() => handleAddQuantity(cartItem)}>+</div>
                    </div>
                  </div>
                </div>

                <div className='basis-[20%] text-xl font-semibold justify-center flex flex-row'>
                  RM {cartItem.quantity * cartItem.price}
                </div>

                <div className='basis-[20%] justify-center flex flex-row'>
                  <Image
                    alt='removeIcon'
                    onClick={() => handleRemoveButton(cartItem)}
                    className='h-7 w-7'
                    src={assets.remove_icon}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-10 basis-[30%] w-full bg-slate-100 rounded-lg p-5'>
        <div className='text-2xl flex  text-[#36415F] font-semibold'>
          Order Summary
        </div>

        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-3'>
            <div className='text-xl text-[#36415F] font-semibold'>
              DELIVERY ADDRESS
            </div>
            <div className='flex flex-row '>
              {address.zipcode === '' ? (
                <div className='justify-between flex-row'>
                  {' '}
                  <div className='text-lg text-gray-500'>No Address Found</div>
                  <div
                    onClick={handleAddAddress}
                    className='text-green-600 text-lg hover:cursor-pointer'>
                    Add Address
                  </div>
                </div>
              ) : (
                <div className='flex flex-col text-gray-500 text-lg'>
                  <div>
                    {address.unitNumber}, {address.street}
                  </div>
                  <div>
                    {address.city}, {address.zipcode}
                  </div>
                  <div>{address.state}</div>
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='text-xl text-[#36415F] font-semibold'>
              PAYMENT METHOD
            </div>
            <select
              className='py-5 text-lg px-8 bg-white rounded-lg border-gray-100'
              name='preferredPaymentMethod'
              id='preferredPaymentMethod'
              value={preferredPaymentMethod}
              onChange={(e) => setPreferredPaymentMethod(e.target.value)}>
              <option value='Cash On Delivery'>Cash on Delivery</option>
              <option value='Touch N Go'>Touch N Go</option>
            </select>
          </div>
        </div>

        <div className='flex flex-col text-lg gap-5 text-gray-500'>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-row justify-between'>
              <div>Price</div>
              <div>RM{allSubtotal}</div>
            </div>
            <div className='flex flex-row justify-between'>
              <div>Delivery Fee</div>
              <div>RM{deliveryFee}</div>
            </div>
            <div className='flex flex-row justify-between'>
              <div>Tax (5%)</div>
              <div>RM{totalTax}</div>
            </div>
          </div>
          <div className=' text-gray-800 flex flex-row justify-between text-2xl'>
            <div className=''>Total Amount</div>
            <div className=''>RM{allTotal}</div>
          </div>
        </div>

        <div className='py-3 px-8 w-full bg-[#4FBF8B] items-center justify-center text-center text-2xl text-white hover:cursor-pointer hover:bg-green-600 '>
          <button onClick={handleButtonClick}>Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
