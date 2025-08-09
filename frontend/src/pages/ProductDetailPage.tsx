import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { Product } from '../types';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) {
                setError('Product ID not found');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const productData = await productAPI.getProduct(parseInt(id));
                setProduct(productData);
            } catch (err: any) {
                console.error('Error loading product:', err);
                setError('Product not found or failed to load');
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const handleAddToCart = () => {
        // TODO: Implement add to cart functionality
        alert(`Added ${quantity} ${product?.name}(s) to cart! (Cart functionality coming soon)`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-gray-600">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
                    <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Product Not Found</h3>
                    <p className="mt-2 text-gray-500">{error}</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    const isOutOfStock = product.stockQuantity === 0;
    const isLowStock = product.stockQuantity <= 10 && product.stockQuantity > 0;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex mb-8" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-gray-700 hover:text-blue-600">
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <Link to="/products" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                                    Products
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <span className="ml-1 text-gray-500 md:ml-2">{product.name}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    {/* Product Image */}
                    <div className="flex flex-col-reverse">
                        <div className="aspect-w-1 aspect-h-1 w-full">
                            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Product+Image';
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <svg className="h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <div className="flex items-center space-x-2 mb-4">
                            {isOutOfStock ? (
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Out of Stock
                </span>
                            ) : isLowStock ? (
                                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Low Stock ({product.stockQuantity} left)
                </span>
                            ) : (
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  In Stock
                </span>
                            )}
                            <span className="text-gray-500 text-sm">Product ID: #{product.id}</span>
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            {product.name}
                        </h1>

                        <div className="mt-3">
                            <p className="text-3xl text-green-600 font-bold">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <div className="text-base text-gray-700">
                                <p>{product.description}</p>
                            </div>
                        </div>

                        {/* Quantity and Add to Cart */}
                        {!isOutOfStock && (
                            <div className="mt-8">
                                <div className="flex items-center space-x-4 mb-4">
                                    <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                                        Quantity:
                                    </label>
                                    <select
                                        id="quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {[...Array(Math.min(10, product.stockQuantity))].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md text-lg font-medium transition-colors flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add to Cart
                                </button>
                            </div>
                        )}

                        {/* Product Details */}
                        <div className="mt-8 border-t border-gray-200 pt-8">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Stock Quantity:</span>
                                    <span className="font-medium">{product.stockQuantity} units</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <span className="font-medium">
                    {product.active ? 'Active' : 'Inactive'}
                  </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Added:</span>
                                    <span className="font-medium">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Last Updated:</span>
                                    <span className="font-medium">
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </span>
                                </div>
                            </div>
                        </div>

                        {/* Back to Products */}
                        <div className="mt-8">
                            <Link
                                to="/products"
                                className="inline-flex items-center text-blue-600 hover:text-blue-500"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;