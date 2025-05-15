import React from 'react';

function Footer() {
  return (
    <div className='px-10 py-6 gap-8 bg-[#EDF8F3] justify-between flex flex-col'>
      <div className='flex flex-row items-center '>
        <div className='flex flex-col basis-[30%] gap-5'>
          <div className='text-3xl font-bold'>
            <span className='text-emerald-700'>Meal</span>
            <span className='text-teal-600'>Mate</span>
          </div>
          <div className='text-gray-500 text-wrap text-lg '>
            Connecting you with nearby vendors in your residential college —
            discover and order your favorite meals online, all in one place.
          </div>
        </div>

        <div className='flex flex-row flex-1  gap-[200px] justify-end'>
          <div className='flex flex-col gap-5'>
            <div className='text-lg font-semibold'>Quick Links</div>
            <div className='flex flex-col gap-3 text-gray-600 '>
              <div>Home</div>
              <div>Best Sellers</div>
              <div>Offers & Deals</div>
              <div>FAQs</div>
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='text-lg font-semibold'>Help & Support</div>
            <div className='flex flex-col gap-3 text-gray-600 '>
              <div>Delivery Information</div>
              <div>Return & Refund Policy</div>
              <div>Payment Methods</div>
              <div>Track Your Order</div>
              <div>Contact Us</div>
            </div>{' '}
          </div>

          <div className='flex flex-col gap-5'>
            <div className='text-lg font-semibold'>Follow Us</div>
            <div className='flex flex-col gap-3 text-gray-600 '>
              <div>Instagram</div>
              <div>Twitter</div>
              <div>Facebook</div>
              <div>YouTube</div>
            </div>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
