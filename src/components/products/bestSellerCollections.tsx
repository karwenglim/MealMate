import React from 'react';
import { dummyProducts } from '../../../assets/images/assets';
import Card from './card';
function Collections() {
  const products = dummyProducts.slice(0, 6);
  return (
    <div className='flex flex-col gap-5'>
      <div className='text-4xl text-[#36415F] '>Best Seller</div>
      <div className='flex flex-row gap-5 justify-between'>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Collections;
