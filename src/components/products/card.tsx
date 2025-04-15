import React from 'react';
import Image from 'next/image';
import unratedStar from '../../../assets/images/star_dull_icon.svg';
import ratedStar from '../../../assets/images/star_icon.svg';
import { Product } from '@/types/Product';
import cartIcon from '../../../assets/images/cart_icon.svg';
interface CardProp {
  product: Product;
}
function Card({ product }: CardProp) {
  const numRatedStar = product.ratings;
  const numUnratedStar = 5 - numRatedStar;
  return (
    <div className='flex flex-col p-5   border border-slate-200 '>
      <Image
        alt='productImg'
        className='h-40 w-45'
        src={product.image[0]}
      />
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-1'>
          <div className='text-md text-gray-500'>{product.category}</div>
          <div className='text-lg'>{product.name}</div>

          <div className='flex flex-row gap-1'>
            <div className='flex flex-row'>
              {Array(numRatedStar)
                .fill(null)
                .map((_, index) => (
                  <Image
                    src={ratedStar}
                    key={index}
                    alt='ratedStar'
                  />
                ))}
              {Array(numUnratedStar)
                .fill(null)
                .map((_, index) => (
                  <Image
                    src={unratedStar}
                    key={index}
                    alt='unratedStar'
                  />
                ))}
            </div>
            <div className='text-gray-500'>({numRatedStar})</div>
          </div>
        </div>

        <div className='flex flex-row justify-between items-center '>
          <div className='text-[#4FBF8B] text-2xl'>RM{product.price}</div>
          <div className='text-[#6CC99E] text-xl flex flex-row gap-2 items-center border border-[#6CC99E] rounded-lg py-2 px-4 hover:cursor-pointer'>
            <Image
              alt='addToCartIcon'
              src={cartIcon}
              className='w-5 h-5 hover:text-white'
            />
            <div>Add</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
