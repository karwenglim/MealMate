import React from 'react';
import { products } from '@/data/products';
import Card from '../products/card';
function Collections() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='text-4xl '>Best Seller</div>
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
