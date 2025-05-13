/* eslint-disable @typescript-eslint/no-explicit-any */

// import { Card } from '@tremor/react';
import { DonutChart } from '@/components/tremor/DonutChart';
import { Card } from '@/components/tremor/Card';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const data = [
  {
    name: 'Success',
    amount: 4000,
    share: '80%',
    href: '#',
    borderColor: 'bg-green-600',
  },
  {
    name: 'Pending',
    amount: 750,
    share: '15%',
    href: '#',
    borderColor: 'bg-orange-400',
  },
  {
    name: 'Failed',
    amount: 250,
    share: '5%',
    href: '#',
    borderColor: 'bg-pink-500',
  },
];

const currencyFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

function OrderStatusChart() {
  return (
    <>
      <Card className='sm:mx-auto sm:max-w-xl rounded-xl  border-slate-300 border'>
        <h3 className='text-tremor-default font-medium text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong'>
          Order Status
        </h3>
        <p className='mt-1 text-tremor-default text-lg text-[#36415F] leading-6 text-tremor-content dark:text-dark-tremor-content'>
          Breaking down order status for this month
        </p>

        <div className='grid grid-cols-1 h-[300px] gap-5 sm:grid-cols-2 sm:gap-8'>
          <DonutChart
            data={data}
            value='amount'
            category='name'
            valueFormatter={currencyFormatter}
            showTooltip={false}
            className='h-40 mt-10'
            colors={['emerald', 'amber', 'pink']}
          />
          <div className='mt-6 flex items-center sm:mt-0'>
            <ul
              role='list'
              className='space-y-3'>
              {data.map((item) => (
                <li
                  key={item.name}
                  className='flex space-x-3'>
                  <span
                    className={classNames(
                      item.borderColor,
                      'w-1 shrink-0 rounded'
                    )}
                  />
                  <div>
                    <p className='text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                      {currencyFormatter(item.amount)}{' '}
                      <span className='font-normal'>({item.share})</span>
                    </p>
                    <p className='mt-0.5 whitespace-nowrap text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
                      {item.name}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}
export default OrderStatusChart;
