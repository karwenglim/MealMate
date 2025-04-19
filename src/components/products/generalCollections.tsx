'use client';
import React, { useMemo, useCallback } from 'react';
import { dummyProducts } from '../../../assets/images/assets';
import Card from './card';
import { Product } from '@/types/Product';
import { Category } from '@/types/Category';
import { selectQuery } from '@/lib/features/query/querySlice';
import { useAppSelector } from '@/lib/hooks';

interface collectionProp {
  category?: Category;
}
function GeneralCollections({ category }: collectionProp) {
  const query = useAppSelector(selectQuery);

  const filteredProducts = useMemo(() => {
    let base = dummyProducts;

    if (category && query) {
      const categorisedProduct = dummyProducts.filter(
        (product) => product.category === category.path
      );
      base = categorisedProduct.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    } else if (category) {
      base = base.filter((product) => product.category === category.path);
    } else if (query) {
      base = base.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    return base;
  }, [category, query]);

  const getChunkedProducts = useCallback((products: Product[]) => {
    const chunks: Product[][] = [];
    for (let i = 0; i < products.length; i = i + 5) {
      chunks.push(products.slice(i, i + 5));
    }
    return chunks;
  }, []);

  const displayedProducts = getChunkedProducts(filteredProducts);

  return (
    <div className='flex flex-col gap-10'>
      <div className='text-4xl'>{category?.text || 'All Products'}</div>
      <div className='flex flex-col gap-20'>
        {displayedProducts.map((group, idx) => (
          <div
            key={idx}
            className='flex flex-row justify-center gap-20'>
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
