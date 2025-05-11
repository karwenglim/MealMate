'use client';
import React, { useRef } from 'react';
import searchIcon from '../../../assets/images/search_icon.svg';
import Image from 'next/image';
import profileIcon from '../../../assets/images/profile_icon.png';
import navCartIcon from '../../../assets/images/nav_cart_icon.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/lib/hooks';
import { setQuery } from '@/lib/features/query/querySlice';
import { getTotalQty } from '@/lib/features/user/userSlice';
import { useParams } from 'next/navigation';
function Header() {
  const dispatch = useDispatch();
  const params = useParams();
  const totalQty = useAppSelector(getTotalQty);
  const category = params?.category;
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleInputChange = () => {
    const value = inputRef.current?.value.trim() as string;
    dispatch(setQuery(value));

    if (value && category) {
      router.push(`/products/${category}`);
    } else router.push('/products');
  };

  const toOrdersPage = () => router.replace('/my-orders');

  return (
    <div className='flex flex-row p-8 w-full border-b-1 border-slate-300 sticky'>
      <div className='flex flex-row  w-full justify-between '>
        <div className='text-3xl font-bold hover:cursor-pointer'>
          <Link href='/'>
            <span className='text-blue-700 '>Meal</span>
            <span className='text-yellow-500'>Mate</span>
          </Link>
        </div>
        <div className='flex flex-row gap-10 items-center justify-end basis-[60%] hover:cursor-pointer'>
          <Link href='/seller'>
            <div className='rounded-full text-lg text-gray-500 py-2 px-3 border border-slate-300'>
              Seller Dashboard
            </div>
          </Link>

          <div className='text-lg hover:cursor-pointer'>
            <Link href='/'>Home</Link>
          </div>
          <div className='text-lg hover:cursor-pointer'>
            <Link href='/products'>All Products</Link>
          </div>
          <div className='flex flex-row gap-4'>
            <input
              type='text'
              className='border border-slate-300 rounded-full py-2 px-5 text-lg'
              placeholder='Search for Product'
              ref={inputRef}
              onChange={handleInputChange}
            />
            <Image
              src={searchIcon}
              alt='Search icon'
              className='ml-auto'
            />
          </div>
          <Link href='/cart'>
            <div className='relative hover:cursor-pointer'>
              <Image
                src={navCartIcon}
                alt='Cart Icon'
                className='w-7'
              />
              <div className='bg-[#4FBF8B] text-white w-6 h-6 text-center rounded-full absolute -right-4 -top-4'>
                {totalQty}
              </div>
            </div>
          </Link>

          <div
            onClick={toOrdersPage}
            className='hover:cursor-pointer'>
            <Image
              src={profileIcon}
              alt='Profile Icon'
              className='w-10'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
