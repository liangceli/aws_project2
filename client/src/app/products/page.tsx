// 记一个 React 组件应在客户端（浏览器）运行，而不是默认的服务器端渲染（SSR）。
"use client" 

import React, {useState} from 'react'
import { useGetProductsQuery, useCreateProductMutation } from '../state/api';
import { PlusCircleIcon, SearchIcon } from 'lucide-react';
import Header from '../(components)/Navbar/Header';
import Rating from '../(components)/Navbar/Rating';
import CreateProductModal from './CreateProductModal';
import Image from 'next/image';


type ProductFormData = {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
  };

const Products = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {data: products, isLoading, isError} =  useGetProductsQuery(searchTerm);

    const [createProduct] = useCreateProductMutation();
    const handleCreateProduct = async (productData: ProductFormData) => {
      await createProduct(productData);
    };

    if (isLoading) {
        return <div className='py-4'>Loading... ...</div>
    }

    if (isError || !products) {
        return (
            <div className='text-center text-red-500 py-4'>
                Failed to fetch products
            </div>
        )
    }
  return (
    // mx-auto 是使元素在父容器内居中
    <div className='mx-auto pb-5 w-full'>
        {/*SEARCH BAR */}
            <div className='mb-6'>
                <div className='flex items-center rounded '>
                    <SearchIcon className='w-5 h-5 text-gray-500 m-2'/>
                    <input className='w-full py-2 px-4 rounded bg-white ' 
                           placeholder="Search products ... ..."
                           value = {searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>
            </div>

            {/* HEADER */}
            <div className='flex justify-between items-center mb-6'>
                <Header name='Products'/>
                <button className='flex items-center bg-[#ff744c] hover:bg-orange-700 text-gray-200 font-bold py-2 px-4 rounded'
                        onClick={() => setIsModalOpen(true)}>
                    <PlusCircleIcon className='w-5 h-5 '/>
                    Create product
                </button>
            </div>

            {/* BODY PRODUCTS LIST */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between'>
                {isLoading ? (
                    <div>Loading... ...</div>
                ) : (products?.map((product) => (
                    <div key={product.productId} className='border shadow-[0_0_20px_5px_rgba(64,44,36,0.9)] rounded-md p-4 max-w-full w-full mx-auto'>
                        <div className='flex flex-col items-center'>
                        <Image
                            src={`https://s3-awsproject.s3.ap-southeast-2.amazonaws.com/product${
                                Math.floor(Math.random() * 3) + 1
                            }.png`}
                            alt={product.name}
                            width={150}
                            height={150}
                            className="mb-3 rounded-2xl w-36 h-36"
                            />
                            <h3 className='text-lg text-gray-200 font-semibold'>
                                {product.name}
                            </h3>
                            <p className='text-gray-100'>${product.price.toFixed(2)}</p>
                            <div className='text-sm text-gray-100 mt-1'>
                                Stock: {product.stockQuantity}
                            </div>
                            {product.rating && (
                                <div className='flex items-center mt-2'>
                                    <Rating rating={product.rating}/>
                                </div>
                            )}
                        </div>
                    </div>
                )))}
            </div>

            {/* MODAL */}
            <CreateProductModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onCreate={handleCreateProduct}/>
    </div>
    
  )
}

export default Products