import React from 'react';
import GeneralCollections from '@/components/products/generalCollections';

interface CategoryPageProp {
  category: string;
  fancyString: string;
}
function CategoryPage({ category, fancyString }: CategoryPageProp) {
  return (
    <div className='py-15 px-30 flex flex-col w-full gap-30'>
      <div>{fancyString}</div>
      <GeneralCollections category={category} />
    </div>
  );
}

export default CategoryPage;
