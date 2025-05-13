import React, { useState } from 'react';
import Image from 'next/image';
import { categories } from '../../../assets/images/assets';

const AddProduct = () => {
  const [imagePreview, setImagePreview] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [offerPrice, setOfferPrice] = useState<string>('');

  const categoriesRep = categories.map((category) => category.path);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const handleAddProduct = () => {
    // Mock submission logic (console.log or send to backend)
    const newProduct = {
      image: imagePreview,
      name: productName,
      description,
      category,
      originalPrice,
      offerPrice,
    };

    console.log('Submitted Product:', newProduct);

    // Reset all states
    setImagePreview('');
    setProductName('');
    setDescription('');
    setCategory('');
    setOriginalPrice('');
    setOfferPrice('');

    // Show simple notification
    alert('Product added successfully!');
  };

  return (
    <div className='flex flex-col gap-10 text-[#36415F]'>
      {/* Product Image Upload */}
      <div className='flex flex-col gap-5'>
        <div className='text-xl'>Product Image</div>
        <label
          htmlFor='imageUpload'
          className='w-40 h-40 flex items-center justify-center border border-slate-300 rounded-xl cursor-pointer bg-gray-100 text-gray-500 text-sm'>
          {imagePreview ? (
            <Image
              width={60}
              height={80}
              src={imagePreview}
              alt='Uploaded Preview'
              className='w-full h-full object-cover rounded-xl'
            />
          ) : (
            'Click to upload image'
          )}
        </label>
        <input
          type='file'
          id='imageUpload'
          accept='image/*'
          className='hidden'
          onChange={handleImageChange}
        />
      </div>

      {/* Product Name */}
      <div className='flex flex-col gap-5'>
        <div className='text-xl'>Product Name</div>
        <input
          type='text'
          placeholder='Name'
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className='border border-slate-300 rounded-xl w-120 py-3 px-5 text-lg'
        />
      </div>

      {/* Product Description */}
      <div className='flex flex-col gap-5'>
        <div className='text-xl'>Product Description</div>
        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='border border-slate-300 rounded-xl w-120 h-60 py-3 px-5 text-lg'
        />
      </div>

      {/* Category */}
      <div className='flex flex-col gap-5'>
        <div className='text-xl'>Category</div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='border border-slate-300 rounded-xl w-120 py-3 px-5 text-lg bg-white'>
          <option
            value=''
            disabled>
            Select a category
          </option>
          {categoriesRep.map((cat, idx) => (
            <option
              key={idx}
              value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Prices */}
      <div className='flex flex-row gap-5'>
        <div className='flex flex-col gap-5'>
          <div className='text-xl'>Original Price</div>
          <input
            type='text'
            placeholder='Original Price'
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className='border border-slate-300 rounded-xl w-120 py-3 px-5 text-lg'
          />
        </div>

        <div className='flex flex-col gap-5'>
          <div className='text-xl'>Offer Price</div>
          <input
            type='text'
            placeholder='Offer Price'
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
            className='border border-slate-300 rounded-xl w-120 py-3 px-5 text-lg'
          />
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={handleAddProduct}
        className='bg-green-500 w-40 cursor-pointer py-3 px-5 rounded-xl text-2xl text-white'>
        Add
      </button>
    </div>
  );
};

export default AddProduct;
