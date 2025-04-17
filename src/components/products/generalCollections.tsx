import React, { useMemo } from 'react';
import { dummyProducts } from '../../../assets/images/assets';
import Card from './card';
import { Product } from '@/types/Product';

function GeneralCollections() {
  const chunkedProducts = useMemo(() => {
    const chunks: Product[][] = [];
    for (let i = 0; i < dummyProducts.length; i = i + 5) {
      chunks.push(dummyProducts.slice(i, i + 5));
    }
    return chunks;
  }, [dummyProducts]);

  return (
    <div className='flex flex-col gap-10'>
      <div className='text-4xl'>All Products</div>
      <div className='flex flex-col gap-20'>
        {chunkedProducts.map((group, idx) => (
          <div
            key={idx}
            className='flex flex-row justify-between '>
            {' '}
            {group.map((product, pIdx) => (
              <Card
                key={pIdx}
                product={product}
              />
            ))}
          </div>
        ))}{' '}
      </div>
    </div>
  );
}

export default GeneralCollections;
