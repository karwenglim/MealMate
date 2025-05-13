'use client';
import React, { useRef, useState, useEffect } from 'react';
import searchIcon from '../../../assets/images/search_icon.svg';
import Image from 'next/image';
import profileIcon from '../../../assets/images/profile_icon.png';
import navCartIcon from '../../../assets/images/nav_cart_icon.svg';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/lib/hooks';
import { setQuery } from '@/lib/features/query/querySlice';
import { getTotalQty, getRole } from '@/lib/features/user/userSlice';

function Header() {
  const dispatch = useDispatch();
  const params = useParams();
  const totalQty = useAppSelector(getTotalQty);
  const role = useAppSelector(getRole);
  const category = params?.category;
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = () => {
    const value = inputRef.current?.value.trim() as string;
    dispatch(setQuery(value));
    if (value && category) {
      router.push(`/products/${category}`);
    } else {
      router.push('/products');
    }
  };

  const handleLogout = () => {
    router.replace('/auth/user');
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Optional: Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#profile-dropdown')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className='flex flex-row p-8 w-full border-b border-slate-300 sticky'>
      <div className='flex flex-row w-full justify-between'>
        <div className='text-3xl font-bold hover:cursor-pointer'>
          <Link href='/landing'>
            <span className='text-emerald-700'>Meal</span>
            <span className='text-teal-600'>Mate</span>
          </Link>
        </div>

        <div className='flex flex-row gap-10 items-center justify-end basis-[60%]'>
          {role === 'seller' && (
            <Link href='/seller'>
              <div className='rounded-full text-lg text-gray-500 py-2 px-3 border border-slate-300'>
                Seller Dashboard
              </div>
            </Link>
          )}

          <Link
            href='/landing'
            className='text-lg'>
            Home
          </Link>
          <Link
            href='/products'
            className='text-lg'>
            All Products
          </Link>

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
            <div className='relative'>
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

          {/* Profile dropdown */}
          <div
            className='relative'
            id='profile-dropdown'>
            <Image
              src={profileIcon}
              alt='Profile Icon'
              className='w-10 cursor-pointer'
              onClick={toggleDropdown}
            />

            {showDropdown && (
              <div className='absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-md z-50'>
                {role === 'user' && (
                  <div
                    onClick={() => {
                      router.replace('/my-orders');
                      setShowDropdown(false);
                    }}
                    className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    My Orders
                  </div>
                )}
                <div
                  onClick={handleLogout}
                  className='px-4 py-2 hover:bg-gray-100 cursor-pointer border-t'>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
