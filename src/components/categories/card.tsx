import React from 'react';
import Image from 'next/image';
import { Category } from '../../types/Category';
import Link from 'next/link';

interface CardProp {
  category: Category;
}

function Card({ category }: CardProp) {
  const { path } = category;
  const firstPathLetter = path.charAt(0);
  const lowercaseLetter = firstPathLetter.toLowerCase();
  const remainingString = path.slice(1);
  const formattedPath = lowercaseLetter + remainingString;

  return (
    <Link href={`/products/${formattedPath}`}>
      <div
        className='flex flex-col p-5 rounded-xl'
        style={{ backgroundColor: category.bgColor }}>
        <div className='overflow-hidden'>
          <Image
            src={category.image}
            alt='categoryIcon'
            className='h-40 w-45 transition-transform duration-300 ease-in-out transform hover:scale-110'
          />
        </div>
        <div className='text-center text-[#313131] font-semibold'>
          {category.text}
        </div>
      </div>
    </Link>
  );
}

export default Card;
