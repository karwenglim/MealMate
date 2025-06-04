'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setRole } from '@/lib/features/user/userSlice';

const RiderLogIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoggingIn(true);
    console.log('Rider logging in');
    // Simulate login delay
    setTimeout(() => {
      dispatch(setRole('rider'));
      router.push('/rider-landing');
      setIsLoggingIn(false);
    }, 1000);
  };

  return (
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center lg:w-1/2'>
        <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
          <h1 className='text-5xl font-semibold'>Welcome Back, Rider!</h1>
          <p className='font-medium text-lg text-gray-500 mt-4'>
            Please enter your credentials to access your dashboard.
          </p>
          <div className='mt-8'>
            <div className='flex flex-col'>
              <label className='text-lg font-medium'>Email</label>
              <input
                value={email}
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Enter your email'
                onChange={handleEmailInput}
                type='email'
                autoComplete='email'
              />
            </div>
            <div className='flex flex-col mt-4'>
              <label className='text-lg font-medium'>Password</label>
              <input
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Enter your password'
                value={password}
                type='password'
                onChange={handlePasswordInput}
                autoComplete='current-password'
              />
            </div>

            <div className='mt-8 flex flex-col gap-y-4'>
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className={`transition-all ease-in-out transform py-4 rounded-xl font-bold text-lg
                ${
                  isLoggingIn
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:scale-[1.01] active:scale-[.98] active:duration-75 text-white'
                }`}>
                {isLoggingIn ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
            <div className='mt-8 flex justify-center items-center'>
              <p className='font-medium text-base'>Not a rider?</p>
              <Link href='/auth/user'>
                <button className='ml-2 font-medium cursor-pointer text-base text-purple-600'>
                  Sign in as a user
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200'>
        <div className='w-60 h-60 rounded-full bg-gradient-to-tr from-green-600 to-green-400 animate-spin' />
        <div className='w-full h-1/2 absolute bottom-0 bg-white/10' />
      </div>
    </div>
  );
};

export default RiderLogIn;
