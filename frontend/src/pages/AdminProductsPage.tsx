import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { Product, PagedResponse } from '../types';
import ProductGrid from '../components/products/ProductGrid';
import ProductForm from '../components/products/ProductForm';

const AdminProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const loadProducts = async (page: number = 0) => {
        try {
            setLoading(true);
            setError('');
            const response: PagedResponse<Product> = await productAPI.getProducts(page, 12);
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

    const handleCreateProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            setSubmitting(true);
            await productAPI.createProduct(productData);
            await loadProducts(currentPage);
            setShowForm(false);
            setError('');
        } catch (err: any) {
            console.error('Error creating product:', err);
            setError('Failed to create product. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdateProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (!editingProduct) return;

        try {
            setSubmitting(true);
            await productAPI.updateProduct(editingProduct.id, productData);
            await loadProducts(currentPage);
            setShowForm(false);
            setEditingProduct(null);
            setError('');
        } catch (err: any) {
            console.error('Error updating product:', err);
            setError('Failed to update product. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            return;
        }

        try {
            await productAPI.deleteProduct(productId);
            await loadProducts(currentPage);
            setError('');
        } catch (err: any) {
            console.error('Error deleting product:', err);
            setError('Failed to delete product. Please try again.');
        }
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    const handlePageChange = (newPage: number) => {
        loadProducts(newPage);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    if (showForm) {
        return (
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {editingProduct ? 'Edit Product' : 'Create New Product'}
                            </h1>
                            <p className="mt-1 text-gray-600">
                                {editingProduct
                                    ? 'Update the product information below.'
                                    : 'Fill out the form below to add a new product to your catalog.'
                                }
                            </p>
                        </div>

                        <ProductForm
                            product={editingProduct || undefined}
                            onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                            onCancel={handleCancelForm}
                            loading={submitting}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                        <p className="mt-1 text-gray-600">
                            {totalElements > 0
                                ? `Managing ${totalElements} product${totalElements !== 1 ? 's' : ''}`
                                : 'No products yet - create your first product!'
                            }
                        </p>
                    </div>

                    <div className="flex space-x-4">
                        <Link
                            to="/products"
                            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                        >
                            View Store
                        </Link>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center"
                        >
                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Product
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <dt className="text-sm font-medium text-gray-500">Total Products</dt>
                                <dd className="text-2xl font-semibold text-gray-900">{totalElements}</dd>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <dt className="text-sm font-medium text-gray-500">In Stock</dt>
                                <dd className="text-2xl font-semibold text-gray-900">
                                    {products.filter(p => p.stockQuantity > 0).length}
                                </dd>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <dt className="text-sm font-medium text-gray-500">Low Stock</dt>
                                <dd className="text-2xl font-semibold text-gray-900">
                                    {products.filter(p => p.stockQuantity > 0 && p.stockQuantity <= 10).length}
                                </dd>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <dt className="text-sm font-medium text-gray-500">Out of Stock</dt>
                                <dd className="text-2xl font-semibold text-gray-900">
                                    {products.filter(p => p.stockQuantity === 0).length}
                                </dd>
                            </div>
                        </div>
                    </div>
                </div>

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
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    showAdminActions={true}
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

export default AdminProductsPage;