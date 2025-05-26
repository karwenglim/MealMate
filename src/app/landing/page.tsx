import React from 'react';
import mainBanner from '../../../assets/images/main_banner_bg.png';
import { assets } from '../../../assets/images/assets';
import Image from 'next/image';
import CategoryCollections from '@/components/categories/collections';
import BestSellerCollections from '@/components/products/bestSellerCollections';
import Link from 'next/link';

function Landing() {
  return (
    <div className='py-15 px-30 flex flex-col gap-30'>
      <div className='relative'>
        <Image
          alt='mainBanner'
          src={mainBanner}
        />
        <div className='absolute inset-0 flex gap-10 flex-col items-start justify-center pl-10'>
          <div className='text-[#36415F] w-120 text-5xl font-semibold mb-4'>
            Authentic Campus Eats, Just a Tap Away!
          </div>
          <div className='flex flex-row gap-5 items-center justify-center'>
            <div className='cursor-pointer text-lg bg-[#4FBF8B] hover:bg-green-600 transition ease-in-out text-white px-8 py-3 rounded-lg'>
              Shop Now
            </div>
            <div className='cursor-pointer text-lg  text-[#36415F] px-4 py-2 font-semibold rounded-lg'>
              Explore Deals{' '}
              <span className='ml-2 text-lg font-bold'>&#8594;</span>
            </div>
          </div>
        </div>
        {/* Featured dish caption */}
        <div className='absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm'>
          Featured dish on banner: Fruits from KK12 Cafeteria
        </div>
      </div>

      {/* Seller premium subscription box */}
      <div className='bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center'>
        <div className='flex flex-col items-center gap-3'>
          <p className='text-gray-600 text-lg font-medium'>To sellers: Subscribe to Premium Sellers to feature your food here!</p>
          <Link href='/seller'>
            <div className='bg-[#4FBF8B] hover:bg-green-600 transition ease-in-out text-white px-6 py-2 rounded-lg text-sm cursor-pointer mt-2'>
              Upgrade Now
            </div>
          </Link>
        </div>
      </div>

      <div>
        <CategoryCollections />
      </div>

      <div>
        <BestSellerCollections />
      </div>

      <div className='relative'>
        <div>
          <Image
            src={assets.bottom_banner_image}
            alt='bottomBanner'
            className=''
          />
        </div>
        <div className='absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-5'>
          <div className='text-[#4FBF8B] text-4xl font-bold'>
            Why is our platform preferred?
          </div>
          <div className='flex flex-row gap-10 items-center '>
            <Image
              src={assets.delivery_truck_icon}
              alt='deliveryTruckIcon'
              className='w-15 h-15'
            />
            <div className='flex flex-col'>
              <div className='font-semibold text-[#36415F] text-xl'>
                Convenient Campus Eats
              </div>
              <div className=' text-lg text-gray-500'>
                Order your favorite meals right from your campus, and have them
                delivered to your door in no time!
              </div>
            </div>
          </div>
          <div className='flex flex-row gap-10 items-center '>
            <Image
              src={assets.leaf_icon}
              alt='deliveryTruckIcon'
              className='w-15 h-15'
            />
            <div className='flex flex-col'>
              <div className='font-semibold text-[#36415F] text-xl'>
                A Taste of Campus Life
              </div>
              <div className=' text-lg text-gray-500'>
                Supporting local vendors, we bring campus favorites straight to
                you, with just a few taps.
              </div>
            </div>
          </div>
          <div className='flex flex-row gap-10 items-center '>
            <Image
              src={assets.coin_icon}
              alt='deliveryTruckIcon'
              className='w-15 h-15'
            />
            <div className='flex flex-col'>
              <div className='font-semibold text-[#36415F] text-xl'>
                Fast. Easy. Delicious.
              </div>
              <div className=' text-lg text-gray-500'>
                Skip the lines, enjoy the food—our platform makes ordering food
                around campus quicker and simpler.
              </div>
            </div>
          </div>
          <div className='flex flex-row gap-10 items-center '>
            <Image
              src={assets.trust_icon}
              alt='deliveryTruckIcon'
              className='w-15 h-15'
            />
            <div className='flex flex-col'>
              <div className='font-semibold text-[#36415F] text-xl'>
                Discover Campus Flavors
              </div>
              <div className='text-lg text-gray-500'>
                Explore a variety of delicious options from your favorite campus
                vendors—one platform, endless choices.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-8 justify-center items-center'>
        <div className='flex flex-col items-center gap-5'>
          <div className='text-5xl font-semibold text-[#313131]'>
            Never miss a deal!
          </div>
          <div className='text-2xl text-gray-500'>
            Subscribe to get the latest offers, new arrivals, and exclusive
            discounts
          </div>
        </div>
        <div className='flex flex-row border-slate-300 rounded-lg w-300 '>
          <input
            type='text'
            placeholder='Enter your email here!'
            className='border py-5 px-8 border-slate-300 text-lg w-full '
          />
          <div className='bg-green-400 text-white text-lg py-5 px-8  '>
            Subscribe
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
