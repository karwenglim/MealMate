'use client';
import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { dummyProducts } from '../../../../../assets/images/assets';
import Image, { StaticImageData } from 'next/image';
import unratedStar from '../../../../../assets/images/star_dull_icon.svg';
import ratedStar from '../../../../../assets/images/star_icon.svg';
import Card from '@/components/products/card';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '@/lib/features/user/userSlice';
import { useAppSelector } from '@/lib/hooks';
import { selectUser } from '@/lib/features/user/userSlice';
import { Product } from '@/types/Product';
function ProductPage() {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const cart = user.cart;
  const dispatch = useDispatch();
  const { category, productId } = useParams() as {
    category: string;
    productId: string;
  };

  const foundProduct = useMemo(() => {
    return dummyProducts.find((product) => product._id === productId);
  }, [productId]);

  // Memoized product in cart
  const existingProductInCart = useMemo(() => {
    return cart.find((product) => product._id === productId);
  }, [cart, productId]);

  const handleClickAddToCart = (product: Product) => {
    if (!product) return;
    dispatch(addToCart(product));
  };

  const handleClickBuyNow = () => {
    router.push('/cart');
  };
  const handleClickRemoveFromCart = (product: Product) => {
    if (!product) return;
    if (!existingProductInCart) return;
    dispatch(removeFromCart(product));
  };

  const firstLetterCategory = category.charAt(0);
  const capitalisedFirst = firstLetterCategory.toUpperCase();
  const remainingWord = category.slice(1);
  const formattedCategory = capitalisedFirst + remainingWord;

  const relatedProducts = dummyProducts
    .filter((product) => product.category === formattedCategory)
    .slice(0, 6);

  const numRatedStar = foundProduct?.ratings as number;
  const numUnratedStar = 5 - numRatedStar;
  if (!foundProduct) {
    return (
      <div className='py-15 px-30 flex flex-col gap-10 w-full'>
        <h1 className='text-red-500'>Product not found.</h1>;
      </div>
    );
  }
  return (
    <div className='py-15 px-30 flex flex-col gap-10 w-full'>
      <div className='text-lg text-[#36415F] font-[400] font-outfit '>
        Products / {foundProduct?.category} /{' '}
        <span className='text-[#4FBF8B]'>{foundProduct?.name}</span>{' '}
      </div>

      <div className='flex flex-row  gap-20'>
        <div className='flex flex-row gap-7'>
          <div className='flex flex-col gap-5'>
            {foundProduct?.image.map((img, index) => (
              <div key={index}>
                <Image
                  alt='productImg'
                  src={img}
                  className='w-30 h-30 border border-slate-300 rounded-lg'
                />
              </div>
            ))}
          </div>
          <div className='border-slate-300 border rounded-lg'>
            <Image
              alt='mainImg'
              className='h-full object-contain'
              src={foundProduct?.image[0] as StaticImageData}
            />
          </div>
        </div>
        <div className='flex flex-col  flex-1 gap-10'>
          <div className='flex flex-col gap-3'>
            <div className='text-4xl font-[500] text-[#36415F]'>
              {foundProduct?.name}
            </div>
            <div className='flex flex-row gap-3'>
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
              <div className=' text-lg'>({numRatedStar})</div>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='text-gray-400 line-through'>
              Original Price : RM{foundProduct?.price}
            </div>
            <div className='text-3xl text-[#36415F]'>
              Offer Price : RM{foundProduct?.offerPrice}
            </div>
            <div className='text-gray-400'>(inclusive of all taxes)</div>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='text-[#36415F] font-semibold'>About Product</div>
            <ul className='list-disc'>
              {foundProduct?.description.map((desc, index) => (
                <li
                  key={index}
                  className='list-inside text-gray-400'>
                  {desc}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-row w-full gap-10'>
            {existingProductInCart ? (
              <div
                // onClick={() => handleClickAddToCart(foundProduct)}
                className='bg-gray-200 justify-between rounded-lg flex  p-5 text-[#36415F] w-100 text-center hover:bg-gray-300 hover:cursor-pointer transition-all ease-in-out'>
                <div
                  className='text-2xl'
                  onClick={() => handleClickRemoveFromCart(foundProduct)}>
                  -
                </div>
                <div className='text-2xl'>{existingProductInCart.quantity}</div>
                <div
                  className='text-2xl'
                  onClick={() => handleClickAddToCart(foundProduct)}>
                  +
                </div>
              </div>
            ) : (
              <div
                onClick={() => handleClickAddToCart(foundProduct)}
                className='bg-gray-200 rounded-lg text-lg p-5 text-[#36415F] w-100 text-center hover:bg-gray-300 hover:cursor-pointer transition-all ease-in-out'>
                Add to Cart
              </div>
            )}

            <div
              onClick={handleClickBuyNow}
              className='bg-[#6CC99E] rounded-lg text-lg text-white p-5 text-center w-100 hover:bg-[#4FBF8B] hover:cursor-pointer transition-all ease-in-out '>
              Buy Now
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col w-full gap-10 items-center'>
        <div className='text-4xl font-[500] text-[#36415F]'>
          Related Products
        </div>
        <div className='flex flex-row gap-5 w-full justify-between'>
          {relatedProducts.map((product, index) => (
            <Card
              key={index}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
