"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';
const categories = [
    'Phone', 'Computer', 'TV', 'Earphone', 'Tablet', 'Charger', 'Mouse', 'Keypad', 
    'Bluetooth', 'Pendrive', 'Remote', 'Speaker', 'Headset', 'Laptop', 'PC'
  ];
const Products = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    sort: '',
    order: '',
    page: 1,
    limit: 10,
    brand: '',
    priceRange: '',
  });

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await axios.get(`http://localhost:4000/api/categories/${category}/products?${queryParams}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const [category, setCategory] = useState("Laptop");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, category]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-white">Category</label>
        <select
          id="category"
          name="category"
          value={filters.category}
          onChange={(e)=> setCategory(e.target.value)}
          className="block appearance-none w-full bg-gray-600 border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="priceRange" className="block text-sm font-medium text-white">Price Range</label>
        <select
          id="priceRange"
          name="priceRange"
          value={filters.priceRange}
          onChange={handleFilterChange}
          className="block appearance-none w-full bg-gray-600 border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">All Prices</option>
          <option value="500">Up to 500/-</option>
          <option value="1000">Up to 1000/-</option>
          <option value="1500">Up to 1500/-</option>
          <option value="2000">Up to 2000/-</option>
          <option value="5000">Up to 5000/-</option>
          <option value="10000">Up to 10000/-</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="sort" className="block text-sm font-medium text-white">Sort By</label>
        <select
          id="sort"
          name="sort"
          value={filters.sort}
          onChange={handleFilterChange}
          className="block appearance-none w-full bg-gray-600 border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="order" className="block text-sm font-medium text-white">Order</label>
        <select
          id="order"
          name="order"
          value={filters.order}
          onChange={handleFilterChange}
          className="block appearance-none w-full bg-gray-600 border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
</div>
  );
};

export default Products;