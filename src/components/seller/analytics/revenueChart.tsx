// 'use client';

import { AreaChart } from '@tremor/react';
import { Card } from '@/components/tremor/Card';

function valueFormatter(number: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
  });
  return formatter.format(number);
}

const data = [
  {
    date: 'Jan 23',
    Revenue: 38560,
  },
  {
    date: 'Feb 23',
    Revenue: 40320,
  },
  {
    date: 'Mar 23',
    Revenue: 50233,
  },
  {
    date: 'Apr 23',
    Revenue: 55123,
  },
  {
    date: 'May 23',
    Revenue: 56000,
  },
  {
    date: 'Jun 23',
    Revenue: 100000,
  },
  {
    date: 'Jul 23',
    Revenue: 85390,
  },
  {
    date: 'Aug 23',
    Revenue: 80100,
  },
  {
    date: 'Sep 23',
    Revenue: 75090,
  },
  {
    date: 'Oct 23',
    Revenue: 71080,
  },
  {
    date: 'Nov 23',
    Revenue: 68041,
  },
  {
    date: 'Dec 23',
    Revenue: 60143,
  },
];

function RevenueChart() {
  return (
    <>
      <Card className='p-0 sm:mx-auto sm:w-full font-outfit rounded-xl border-slate-300 border '>
        <div className='p-6'>
          <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
            Revenue Breakdown
          </p>
          <p className='text-2xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>
            RM60,143
          </p>
          <AreaChart
            data={data}
            index='date'
            categories={['Revenue']}
            showLegend={false}
            showGradient={false}
            yAxisWidth={45}
            valueFormatter={valueFormatter}
            className='mt-8 hidden h-60 sm:block '
          />
          <AreaChart
            data={data}
            index='date'
            categories={['Revenue']}
            showLegend={false}
            showGradient={false}
            showYAxis={false}
            startEndOnly={true}
            valueFormatter={valueFormatter}
            className='mt-8 h-48 sm:hidden'
          />
        </div>
      </Card>
    </>
  );
}
export default RevenueChart;
