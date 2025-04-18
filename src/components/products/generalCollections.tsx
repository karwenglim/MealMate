import React from 'react';
import { dummyProducts } from '../../../assets/images/assets';
import Card from './card';
import { Product } from '@/types/Product';

interface collectionProp {
  category: string;
}
function GeneralCollections({ category = '' }: collectionProp) {
  const getChunkedProducts = (products: Product[]) => {
    const chunks: Product[][] = [];
    for (let i = 0; i < products.length; i = i + 5) {
      chunks.push(products.slice(i, i + 5));
    }
    return chunks;
  };

  let displayedProducts: Product[][] = [];

  if (category.length === 0) {
    displayedProducts = getChunkedProducts(dummyProducts);
  } else {
    const filteredProducts = dummyProducts.filter(
      (product) => product.category === category
    );
    displayedProducts = getChunkedProducts(filteredProducts);
  }

  return (
    <div className='flex flex-col gap-10'>
      <div className='text-4xl'>All Products</div>
      <div className='flex flex-col gap-20'>
        {displayedProducts.map((group, idx) => (
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
