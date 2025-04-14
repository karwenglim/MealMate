import React from 'react';
import mainBanner from '../../assets/images/main_banner_bg.png';
import Image from 'next/image';
import CategoryCollections from '@/components/categories/collections';
import BestSellerCollections from '@/components/products/collections';
function Landing() {
  return (
    <div className='py-15 px-30 flex flex-col gap-10'>
      <div className='relative'>
        <Image
          alt='mainBanner'
          src={mainBanner}
        />
        <div className='absolute inset-0 flex gap-10 flex-col items-start justify-center pl-10'>
          <div className='text-[#313131] text-5xl font-semibold mb-4'>
            Authentic Campus Eats, Just a Tap Away!
          </div>
          <div className='flex flex-row gap-5 items-center justify-center'>
            <div className='cursor-pointer text-lg bg-blue-500 text-white px-4 py-2 rounded-lg'>
              Shop Now
            </div>
            <div className='cursor-pointer text-lg bg-green-500 text-white px-4 py-2 rounded-lg'>
              Explore Deals
            </div>
          </div>
        </div>
      </div>
      <div>
        <CategoryCollections />
      </div>
      <div>
        <BestSellerCollections />
      </div>
    </div>
  );
}

export default Landing;
