import React from 'react';
import Image from 'next/image';
import { Category } from '../../types/Category';
interface CardProp {
  category: Category;
}

function Card({ category }: CardProp) {
  return (
    <div
      className='flex flex-col p-5  rounded-xl'
      style={{ backgroundColor: category.colour }}>
      <Image
        src={category.icon}
        alt='categoryIcon'
        className='h-40 w-45'
      />
      <div className='text-center text-[#313131] font-semibold'>
        {category.name}
      </div>
    </div>
  );
}

export default Card;
