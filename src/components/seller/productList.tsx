import React from 'react';
import { dummyProducts } from '../../../assets/images/assets';
import ProductCard from './productList/productCard';
const ProductList = () => {
  const renderedProducts = dummyProducts.slice(0, 5);
  return (
    <div className='flex flex-col w-full gap-5'>
      <div className='text-xl font-semibold text-[#36415F]'>All Products</div>
      <div className='flex flex-col gap-3 border-slate-300 border rounded-xl px-5 py-3'>
        <div className='flex flex-row '>
          <div className='font-semibold text-lg flex-1'>Product</div>
          <div className='font-semibold text-lg basis-[15%]'>Category</div>
          <div className='font-semibold text-lg basis-[15%]'>Selling Price</div>
          <div className='font-semibold text-lg basis-[15%]'>In Stock</div>
        </div>
        <div className='flex flex-col gap-5 py-3'>
          {renderedProducts.map((dummyProduct, idx) => (
            <ProductCard
              product={dummyProduct}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
