'use client';
import React, { useMemo } from 'react';
import GeneralCollections from '@/components/products/generalCollections';
import { useParams } from 'next/navigation';
import { categories } from '../../../../assets/images/assets';
function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  const firstLetter = category.charAt(0);
  const upperCasedFL = firstLetter.toUpperCase();
  const remainingStr = category.slice(1);
  const formattedCategoryText = upperCasedFL + remainingStr;

  const targetCategory = useMemo(() => {
    if (!category) return null;
    return categories.find((cat) => cat.path === formattedCategoryText);
  }, [formattedCategoryText, category]);

  return (
    <div className='py-15 px-30 flex flex-col w-full gap-30'>
      <div className='text-lg text-[#36415F] font-[400] font-outfit'>
        {targetCategory && <GeneralCollections category={targetCategory} />}
      </div>
    </div>
  );
}

export default CategoryPage;
