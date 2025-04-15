import React from 'react';
import { categories } from '../../../assets/images/assets';
import Card from './card';
function Collections() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='text-4xl'>Categories</div>
      <div className='flex flex-row gap-5 justify-between'>
        {categories.map((category, index) => (
          <Card
            key={index}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}

export default Collections;
