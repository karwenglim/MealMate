'use client';
import React, { useState } from 'react';

const PremiumIntroductionPage = () => {
  const [notification, setNotification] = useState('');

  const handleRegisterClick = () => {
    setNotification(
      'Your application has been sent to admin. You will hear from us shortly.'
    );
    // Optional: clear notification after some time
    setTimeout(() => setNotification(''), 5000);
  };

  return (
    <div className='min-h-screen w-full bg-[#EDF8F3] flex flex-col items-center p-10'>
      <h1 className='text-4xl text-emerald-700 font-bold mb-10'>
        Premium Subscription Plan
      </h1>

      <div className='flex flex-row gap-10 w-full max-w-5xl'>
        {/* User Perks */}
        <div className='flex-1 bg-white rounded-lg shadow-lg p-8 border border-[#4FBF8B]'>
          <h2 className='text-teal-600 text-2xl font-semibold mb-6'>
            For Users
          </h2>
          <ul className='list-disc list-inside space-y-3 text-gray-700'>
            <li>Exclusive discounts on cafe meals & drinks</li>
            <li>Free or discounted delivery within campus/residential areas</li>
            <li>Early access to new menu items and limited-time offers</li>
            <li>Priority order processing during peak hours</li>
            <li>Access to member-only food events and tastings</li>
          </ul>
          <div className='mt-8 text-xl font-semibold text-emerald-700'>
            Price: <span className='text-2xl'>RM4.99 / month</span>
          </div>
        </div>

        {/* Merchant Perks */}
        <div className='flex-1 bg-white rounded-lg shadow-lg p-8 border border-[#4FBF8B]'>
          <h2 className='text-teal-600 text-2xl font-semibold mb-6'>
            For Merchants
          </h2>
          <ul className='list-disc list-inside space-y-3 text-gray-700'>
            <li>Featured spots on app’s home & premium collections</li>
            <li>Access to detailed customer insights & order trends</li>
            <li>Promotional boosts during special campus events</li>
            <li>Priority support and faster payout processing</li>
            <li>Tools for creating exclusive offers for premium members</li>
          </ul>
          <div className='mt-8 text-xl font-semibold text-emerald-700'>
            Price: <span className='text-2xl'>RM6.99 / month</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleRegisterClick}
        className='mt-12 bg-[#4FBF8B] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors duration-300'>
        Register for Premium
      </button>

      {notification && (
        <div className='mt-6 bg-emerald-100 border border-emerald-400 text-emerald-800 px-6 py-3 rounded-md shadow-md max-w-xl text-center'>
          {notification}
        </div>
      )}
    </div>
  );
};
export default PremiumIntroductionPage;
