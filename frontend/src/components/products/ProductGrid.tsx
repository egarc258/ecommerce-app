import React from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[];
    loading?: boolean;
    onEdit?: (product: Product) => void;
    onDelete?: (productId: number) => void;
    showAdminActions?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
                                                     products,
                                                     loading = false,
                                                     onEdit,
                                                     onDelete,
                                                     showAdminActions = false
                                                 }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                        <div className="h-48 bg-gray-300"></div>
                        <div className="p-4">
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                            <div className="h-6 bg-gray-300 rounded mb-3 w-1/2"></div>
                            <div className="h-8 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-2 text-gray-500">
                    {showAdminActions
                        ? "Start by adding your first product to the catalog."
                        : "Check back later for new products or try adjusting your search."
                    }
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    showAdminActions={showAdminActions}
                />
            ))}
        </div>
    );
};

export default ProductGrid;