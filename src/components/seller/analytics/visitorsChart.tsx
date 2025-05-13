// 'use client';

import { AreaChart } from '@tremor/react';
import { Card } from '@/components/tremor/Card';

const data = [
  { date: 'Jan 23', 'Unique Visitors': 120, 'Returning Visitors': 80 },
  { date: 'Feb 23', 'Unique Visitors': 150, 'Returning Visitors': 100 },
  { date: 'Mar 23', 'Unique Visitors': 180, 'Returning Visitors': 110 },
  { date: 'Apr 23', 'Unique Visitors': 190, 'Returning Visitors': 120 },
  { date: 'May 23', 'Unique Visitors': 220, 'Returning Visitors': 140 },
  { date: 'Jun 23', 'Unique Visitors': 100, 'Returning Visitors': 70 }, // semester break
  { date: 'Jul 23', 'Unique Visitors': 130, 'Returning Visitors': 90 },
  { date: 'Aug 23', 'Unique Visitors': 200, 'Returning Visitors': 150 },
  { date: 'Sep 23', 'Unique Visitors': 240, 'Returning Visitors': 170 },
  { date: 'Oct 23', 'Unique Visitors': 250, 'Returning Visitors': 160 },
  { date: 'Nov 23', 'Unique Visitors': 270, 'Returning Visitors': 180 },
  { date: 'Dec 23', 'Unique Visitors': 180, 'Returning Visitors': 120 }, // semester break
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <>
      <Card className='p-0 w-full rounded-xl border border-slate-300'>
        <div className='p-6'>
          <h3 className='font-semibold text-xl  text-tremor-content-strong dark:text-dark-tremor-content-strong'>
            Visitors Performance
          </h3>
          <p className='text-tremor-default text-[#36415F] leading-6 text-tremor-content dark:text-dark-tremor-content'>
            Analysing store traffic analytics based on visitors performance
          </p>
        </div>
        <div className=' p-6'>
          <div className='md:flex md:items-center md:justify-between'>
            <ul
              role='list'
              className='flex flex-wrap items-center gap-x-6 gap-y-4'>
              <li className='flex items-center space-x-2'>
                <span
                  className='size-3 shrink-0 rounded-sm bg-tremor-brand'
                  aria-hidden={true}
                />
                <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
                  <span className='size-3 shrink-0 rounded-sm bg-green-500' />{' '}
                  <span className='font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                    1,490
                  </span>{' '}
                  Returning Visitors
                </p>
              </li>
              <li className='flex items-center space-x-2'>
                <span
                  className='size-3 shrink-0 rounded-sm bg-green-500'
                  aria-hidden={true}
                />
                <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
                  <span className='font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                    2,230
                  </span>{' '}
                  Unique Visitors
                </p>
              </li>
            </ul>
          </div>
          <AreaChart
            data={data}
            index='date'
            categories={['Unique Visitors', 'Returning Visitors']}
            colors={['green', 'blue']}
            showLegend={false}
            showGradient={false}
            yAxisWidth={70}
            valueFormatter={valueFormatter}
            className='mt-10 hidden h-72 sm:block'
          />
          <AreaChart
            data={data}
            index='date'
            categories={['Unique Visitors', 'Returning Visitors']}
            colors={['green', 'blue']}
            showLegend={false}
            showGradient={false}
            showYAxis={false}
            startEndOnly={true}
            valueFormatter={valueFormatter}
            className='mt-6 h-72 sm:hidden'
          />
        </div>
      </Card>
    </>
  );
}
