'use client';

import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { useRouter } from 'next/navigation';

const dummyDuitNowPayload =
  '00020101021129370016A00000067701011101130066035801700454.00123456789052040000530358002MY5802MY5911John Doe6012Kuala Lumpur6304B60F';

export default function MockDuitNowPayment() {
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<
    'idle' | 'pending' | 'confirmed'
  >('idle');

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleConfirmPayment = async () => {
    setPaymentStatus('pending');
    await sleep(5000);
    setPaymentStatus('confirmed');
    await sleep(2000); // small delay before redirect
    router.push('/my-orders');
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center w-full bg-[#EDF8F3] p-6'>
      <h1 className='text-3xl font-semibold mb-6 text-emerald-700'>
        DuitNow / Touch &apos;n Go QR Payment
      </h1>

      <div className='bg-white p-8 rounded-lg shadow-md flex flex-col items-center gap-6'>
        <p className='text-gray-600 mb-2'>
          Scan this QR code with your DuitNow or Touch &apos;n Go app to make
          payment.
        </p>
        <QRCode
          value={dummyDuitNowPayload}
          size={200}
        />

        {paymentStatus === 'idle' && (
          <button
            onClick={handleConfirmPayment}
            className='mt-6 bg-[#4FBF8B] text-white py-3 px-6 rounded-lg hover:bg-teal-600 transition'>
            Confirm Payment
          </button>
        )}

        {paymentStatus === 'pending' && (
          <p className='mt-6 text-teal-700 animate-pulse'>
            Processing your payment...
          </p>
        )}

        {paymentStatus === 'confirmed' && (
          <p className='mt-6 text-emerald-700 font-semibold'>
            Payment confirmed! Redirecting to your orders...
          </p>
        )}
      </div>
    </div>
  );
}
