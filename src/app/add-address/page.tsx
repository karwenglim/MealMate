'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setEmail,
  setUnitNumber,
  setStreet,
  setCity,
  setState,
  setZipcode,
  setPhoneNumber,
} from '@/lib/features/user/userSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { assets } from '../../../assets/images/assets';
import toast, { Toaster } from 'react-hot-toast';
function AddAddressPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    email: '',
    unitNumber: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    phoneNumber: '',
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitInfo = () => {
    // Check for empty fields
    for (const [key, value] of Object.entries(userInfo)) {
      if (!value.trim()) {
        toast.error(`${key} is required`);
        return; // stop dispatching
      }
    }

    const dispatchers = {
      email: setEmail,
      unitNumber: setUnitNumber,
      street: setStreet,
      city: setCity,
      state: setState,
      zipcode: setZipcode,
      phoneNumber: setPhoneNumber,
    };

    Object.entries(userInfo).forEach(([key, value]) => {
      const action = dispatchers[key as keyof typeof dispatchers];
      if (action) dispatch(action(value));
    });

    router.replace('/cart');
  };

  return (
    <div className='py-15 px-30 justify-between flex flex-row  w-full'>
      <Toaster />
      <div className='flex flex-col gap-10'>
        <div className='text-3xl text-gray-500'>
          Add Shipping <span className='text-green-500'>Address</span>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-row gap-10'>
            <input
              className='px-8 py-5 border border-slate-200 rounded-lg bg-white'
              type='text'
              name='firstName'
              placeholder='First Name'
              onChange={(e) => handleOnChange(e)}
            />
            <input
              className='px-8 py-5 border border-slate-200 rounded-lg bg-white'
              type='text'
              name='lastName'
              placeholder='Last Name'
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <input
            className='px-8 py-5 border border-slate-200 rounded-lg bg-white'
            type='text'
            name='email'
            placeholder='Email Address'
            onChange={(e) => handleOnChange(e)}
          />
          <div className='flex flex-row gap-10'>
            <input
              className='px-8 py-5 border border-slate-200 rounded-lg bg-white'
              type='text'
              name='unitNumber'
              placeholder='Unit Number'
              onChange={(e) => handleOnChange(e)}
            />
            <input
              className='px-8 py-5 border border-slate-200 rounded-lg bg-white'
              type='text'
              name='street'
              placeholder='Street'
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className='flex flex-row gap-10'>
            <input
              className='px-8 py-5 border border-slate-200 rounded-lg bg-white'
              type='text'
              name='city'
              placeholder='City'
              onChange={(e) => handleOnChange(e)}
            />
            <input
              className='px-8 py-5 border border-slate-200 rounded-lg bg-white'
              type='text'
              name='zipcode'
              placeholder='Zipcode'
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <input
            className='px-8 py-5 border border-slate-200 rounded-lg bg-white'
            type='text'
            name='state'
            placeholder='State'
            onChange={(e) => handleOnChange(e)}
          />
          <input
            className='px-8 py-5 border border-slate-200 rounded-lg bg-white'
            type='text'
            name='phoneNumber'
            placeholder='Phone Number'
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div
          onClick={handleSubmitInfo}
          className='w-full bg-green-400 text-xl text-white text-center px-8 py-5 hover:cursor-pointer hover:bg-green-600'>
          Save Address
        </div>
      </div>
      <div>
        <Image
          src={assets.add_address_iamge}
          alt='addressPh'
        />
      </div>
    </div>
  );
}

export default AddAddressPage;
