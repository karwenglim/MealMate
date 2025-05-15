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
  { date: 'Jan 23', Revenue: 186 },
  { date: 'Feb 23', Revenue: 194 },
  { date: 'Mar 23', Revenue: 242 },
  { date: 'Apr 23', Revenue: 265 },
  { date: 'May 23', Revenue: 270 },
  { date: 'Jun 23', Revenue: 481 },
  { date: 'Jul 23', Revenue: 411 },
  { date: 'Aug 23', Revenue: 386 },
  { date: 'Sep 23', Revenue: 361 },
  { date: 'Oct 23', Revenue: 342 },
  { date: 'Nov 23', Revenue: 327 },
  { date: 'Dec 23', Revenue: 289 },
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
            RM4,000
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
