import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import Product from '@/app/Products/[id]/page';

const ProductCard = ({product}) => {

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900 mb-2">{product.productName}</h1>
        <p className="text-gray-700 text-base">Company: {product.companyName}</p>
        <p className="text-gray-700 text-base">Price: ${product.price}</p>
        <p className="text-gray-700 text-base">Rating: {product.rating}</p>
        <p className="text-gray-700 text-base">Discount: {product.discount}%</p>
        <p className="text-gray-700 text-base">Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{product.companyName}</span>
      </div>
    </div>
  );
};

export default ProductCard;