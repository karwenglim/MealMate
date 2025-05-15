import { Product } from '@/types/Product';
import Image from 'next/image';
import React from 'react';
import { Switch } from '@/components/tremor/Switch';

interface ProductCardProp {
  product: Product;
}
const ProductCard = ({ product }: ProductCardProp) => {
  console.log(product);
  return (
    <div className='flex flex-row rounded-xl border-slate-300 border items-center'>
      <div className='flex flex-1 flex-row gap-10 items-center'>
        <Image
          src={product.image[0]}
          alt='prodImg'
          className='w-30 h-30 rounded-xl p-2'
        />
        <div>{product.name}</div>
      </div>
      <div className='flex basis-[15%]'>{product.category}</div>
      <div className='flex basis-[15%] items-center'>{product.price}</div>
      <div className='flex basis-[15%]'>
        <div className='flex items-center justify-center gap-2'>
          <Switch
            defaultChecked
            id='r2'
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
