'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRole } from '@/lib/features/user/userSlice';
import { useRouter } from 'next/navigation';
const SellerLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp] = useState(false);

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleRegister = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log('Registering');
    dispatch(setRole('seller'));
    router.push('/landing');
  };

  return (
    <div className='flex w-full h-screen'>
      <div className='hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200'>
        <div className='w-60 h-60 rounded-full bg-gradient-to-tr from-orange-500 to-purple-500 animate-spin' />
        <div className='w-full h-1/2 absolute bottom-0 bg-white/10' />
      </div>
      <div className='w-full flex items-center justify-center lg:w-1/2'>
        <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
          <h1 className='text-5xl font-semibold'>Welcome Back, Merchant!</h1>
          <p className='font-medium text-lg text-gray-500 mt-4'>
            Welcome back! Please enter your details.
          </p>
          <div className='mt-8'>
            <div className='flex flex-col'>
              <label className='text-lg font-medium'>Email</label>
              <input
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => handleEmailInput(e)}
              />
            </div>
            <div className='flex flex-col mt-4'>
              <label className='text-lg font-medium'>Password</label>
              <input
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Enter your password'
                type={'password'}
                value={password}
                onChange={(e) => handlePasswordInput(e)}
              />
            </div>

            <div className='mt-8 flex flex-col gap-y-4'>
              <button
                onClick={(e) => handleRegister(e)}
                disabled={isSigningUp}
                className={`transition-all ease-in-out transform py-4 rounded-xl font-bold text-lg
    ${
      isSigningUp
        ? 'bg-violet-500 bg-opacity-50 cursor-not-allowed text-white'
        : 'bg-violet-500 text-white hover:scale-[1.01] active:scale-[.98] active:duration-75'
    }`}>
                {isSigningUp ? 'Logging In...' : 'Log In'}
              </button>
            </div>
            <div className='mt-8 flex justify-center items-center'>
              <p className='font-medium text-base'>
                Don&apos;t have a merchant account?
              </p>
              <Link href='/auth/user'>
                <button className='ml-2 font-medium text-base text-violet-500'>
                  Login as a user
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
