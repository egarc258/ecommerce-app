import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productAPI } from '../services/api';
import { Product, PagedResponse } from '../types';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';

const ProductsPage: React.FC = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const loadProducts = async (page: number = 0, search?: string) => {
        try {
            setLoading(true);
            setError('');

            let response: PagedResponse<Product>;

            if (search && search.trim()) {
                response = await productAPI.getProducts(page, 12, search.trim());
            } else {
                response = await productAPI.getProducts(page, 12);
            }

            setProducts(response.content);
            setCurrentPage(response.number);
            setTotalPages(response.totalPages);
            setTotalElements(response.totalElements);

        } catch (err: any) {
            console.error('Error loading products:', err);
            setError('Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(0);
        loadProducts(0, query);
    };

    const handlePriceFilter = async (minPrice: number, maxPrice: number) => {
        try {
            setLoading(true);
            const filteredProducts = await productAPI.getProductsByPriceRange(minPrice, maxPrice);
            setProducts(filteredProducts);
            setTotalElements(filteredProducts.length);
            setTotalPages(1);
            setCurrentPage(0);
        } catch (err: any) {
            console.error('Error filtering products:', err);
            setError('Failed to filter products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setCurrentPage(0);
        loadProducts(0);
    };

    const handlePageChange = (newPage: number) => {
        loadProducts(newPage, searchQuery);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                        <p className="mt-1 text-gray-600">
                            {totalElements > 0
                                ? `Showing ${totalElements} product${totalElements !== 1 ? 's' : ''}`
                                : 'Browse our product catalog'
                            }
                        </p>
                    </div>

                    {user?.role === 'ADMIN' && (
                        <Link
                            to="/admin/products"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                        >
                            Manage Products
                        </Link>
                    )}
                </div>

                {/* Filters */}
                <ProductFilters
                    onSearch={handleSearch}
                    onPriceFilter={handlePriceFilter}
                    onClearFilters={handleClearFilters}
                    loading={loading}
                />

                {/* Error State */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex">
                            <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                {/* Products Grid */}
                <ProductGrid
                    products={products}
                    loading={loading}
                />

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0 || loading}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index)}
                                    disabled={loading}
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                        index === currentPage
                                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages - 1 || loading}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;