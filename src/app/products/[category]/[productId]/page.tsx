'use client';
import React from 'react';
import { useParams } from 'next/navigation';
function Product() {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <div>Hello</div>
    </div>
  );
}

export default Product;
