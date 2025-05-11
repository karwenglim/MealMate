import { BarList } from '@/components/tremor/BarList';
import { Card } from '@/components/tremor/Card';

const pages = [
  { name: 'Nasi Lemak', value: 100 },
  { name: 'Roti Canai', value: 90 },
  { name: 'Satay', value: 85 },
  { name: 'Laksa', value: 70 },
  { name: 'Mee Goreng', value: 63 },
  { name: 'Char Kuey Teow', value: 50 },
  { name: 'Rendang', value: 40 },
  { name: 'Nasi Kerabu', value: 30 },
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

function BestSellingList() {
  return (
    <>
      <Card className='p-0 sm:mx-auto sm:max-w-lg rounded-xl border border-slate-300'>
        <div className='flex items-center justify-between p-6 dark:border-dark-tremor-border'>
          <p className='font-medium text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong'>
            Best Seller
          </p>
          <p className='text-tremor-label text-xl  text-[#36415F] font-light  text-tremor-content dark:text-dark-tremor-content'>
            Quantity
          </p>
        </div>
        <div className={`overflow-hidden p-6`}>
          <BarList
            data={pages}
            valueFormatter={valueFormatter}
          />
        </div>
      </Card>
    </>
  );
}
export default BestSellingList;
