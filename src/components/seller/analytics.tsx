import React from 'react';
import Image from 'next/image';
import { ProgressBar } from '@/components/tremor/ProgressBar';
import { assets } from '../../../assets/images/assets';
import RevenueChart from '../../components/seller/analytics/revenueChart';
import OrderStatusChart from './analytics/orderChart';
import BestSellingList from './analytics/bestSellingList';
import VisitorsChart from './analytics/visitorsChart';
const Analytics = () => {
  const ratingStats = {
    excellent: 30, // 5 stars
    good: 25, // 4 stars
    average: 15, // 3 stars
    belowAverage: 10, // 2 stars
    poor: 5, // 1 star
  };

  const totalRating = 340;
  const numOfRatings = 85;

  const getAverageRating = (
    totalRating: number,
    numOfRatings: number
  ): number => Math.floor(totalRating / numOfRatings);

  const avgRating = getAverageRating(totalRating, numOfRatings);

  return (
    <div className='flex flex-col w-full gap-10 h-full overflow-y-hidden'>
      <div className='flex flex-row justify-between'>
        <div className='rounded-xl shadow-xl border-slate-300 border-1 w-[275px] h-[208px] justify-center items-center text-center gap-8  flex flex-col'>
          <Image
            src={assets.total_customer_icon}
            alt='customer-count'
          />
          <div className='flex flex-col gap-5'>
            <div className='text-[#36415F] text-lg'>Total Customer</div>
            <div className='font-semibold text-xl'>2550</div>
          </div>
        </div>

        <div className='rounded-xl shadow-xl border-1 w-[275px] h-[208px] justify-center items-center text-center gap-8 border-slate-300 flex flex-col'>
          <Image
            src={assets.total_orders_icon}
            alt='orders-count'
          />
          <div className='flex flex-col gap-5'>
            <div className='text-[#36415F] text-lg'>Total Orders</div>
            <div className='font-semibold text-xl'>300</div>
          </div>
        </div>

        <div className='rounded-xl shadow-xl border-1 w-[275px] h-[208px] justify-center items-center text-center gap-8 border-slate-300 flex flex-col'>
          <Image
            src={assets.total_revenue_icon}
            alt='customer-count'
          />
          <div className='flex flex-col gap-5'>
            <div className='text-[#36415F] text-lg'>Total Revenue</div>
            <div className='font-semibold text-xl'>RM4,000</div>
          </div>
        </div>

        <div className='rounded-xl shadow-xl border-1 w-[275px] h-[208px] justify-center items-center text-center gap-8 border-slate-300 flex flex-col'>
          <Image
            src={assets.earn_growth_icon}
            alt='customer-count'
          />
          <div className='flex flex-col gap-5'>
            <div className='text-[#36415F] text-lg'>Earn Growth</div>
            <div className='font-semibold text-xl'>50%</div>
          </div>
        </div>
      </div>

      <div className='flex flex-row gap-10'>
        <div className='flex flex-1 rounded-xl'>
          <RevenueChart />
        </div>
        <div className='flex basis-[25%] rounded-xl '>
          <OrderStatusChart />
        </div>
        <div className='flex basis-[25%]'>
          <BestSellingList />
        </div>
      </div>

      <div className='flex flex-row gap-5'>
        <div className='flex flex-1'>
          <VisitorsChart />
        </div>
        {/* Rating component below*/}
        <div className='flex flex-col rounded-xl border border-slate-300 py-5 px-8 gap-8'>
          <div className='text-xl font-semibold'>Customer Review</div>

          <div className='flex flex-row gap-4 items-center'>
            <div className='flex flex-row gap-2'>
              {Array.from({ length: avgRating }, (_, i) => (
                <Image
                  key={i}
                  src={assets.filled_star_icon}
                  alt='filledStars'
                  className='w-[20px] h-[20px]'
                />
              ))}
              {Array.from({ length: 5 - avgRating }, (_, i) => (
                <Image
                  key={i}
                  src={assets.unfilled_star_icon}
                  alt='unfilledStars'
                  className='w-[20px] h-[20px]'
                />
              ))}
            </div>
            <div className='font-semibold text-xl'>{avgRating}.0</div>
            <div>out of 5 stars</div>
          </div>
          <div className='mx-auto max-w-sm space-y-4'>
            <div className='flex items-center justify-between space-x-3'>
              <ProgressBar
                variant='success'
                value={100}
                className='w-50'
              />
              <span className='text-sm font-semibold text-gray-900 '>
                ({`${ratingStats.excellent}`})
              </span>
              <span className='text-sm font-semibold text-gray-900 '>
                Excellent
              </span>
            </div>
            <div className='flex items-center justify-between space-x-3'>
              <ProgressBar
                variant='default'
                value={75}
                className='w-50'
              />
              <span className='text-sm font-semibold text-gray-900 '>
                ({`${ratingStats.good}`})
              </span>
              <span className='text-sm font-semibold text-gray-900 '>Good</span>
            </div>
            <div className='flex items-center justify-between space-x-3'>
              <ProgressBar
                variant='neutral'
                value={50}
                className='w-50'
              />
              <span className='text-sm font-semibold text-gray-900 '>
                ({`${ratingStats.average}`})
              </span>
              <span className='text-sm font-semibold text-gray-900 '>
                Average
              </span>
            </div>

            <div className='flex items-center justify-between space-x-3'>
              <ProgressBar
                variant='warning'
                value={25}
                className='w-50'
              />
              <span className='text-sm font-semibold text-gray-900 '>
                ({`${ratingStats.belowAverage}`})
              </span>
              <span className='text-sm font-semibold text-gray-900 '>
                Below Average
              </span>
            </div>
            <div className='flex items-center justify-between space-x-3'>
              <ProgressBar
                variant='error'
                value={100}
                className='w-50'
              />
              <span className='text-sm font-semibold text-gray-900 '>
                ({`${ratingStats.poor}`})
              </span>
              <span className='text-sm font-semibold text-gray-900 '>Poor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
