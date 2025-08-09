import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
    product: Product;
    onEdit?: (product: Product) => void;
    onDelete?: (productId: number) => void;
    showAdminActions?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     product,
                                                     onEdit,
                                                     onDelete,
                                                     showAdminActions = false
                                                 }) => {
    const isOutOfStock = product.stockQuantity === 0;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Product Image */}
            <div className="relative h-48 bg-gray-200">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Product+Image';
                        }}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}

                {/* Stock Status Badge */}
                <div className="absolute top-2 right-2">
                    {isOutOfStock ? (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Out of Stock
            </span>
                    ) : product.stockQuantity <= 10 ? (
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Low Stock
            </span>
                    ) : (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              In Stock
            </span>
                    )}
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {product.name}
                    </h3>
                    <div className="text-right ml-2">
                        <p className="text-2xl font-bold text-green-600">
                            ${product.price.toFixed(2)}
                        </p>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Stock: {product.stockQuantity}</span>
                    <span>ID: #{product.id}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <Link
                        to={`/products/${product.id}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
                    >
                        View Details
                    </Link>

                    {!isOutOfStock && (
                        <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Admin Actions */}
                {showAdminActions && (
                    <div className="mt-3 pt-3 border-t border-gray-200 flex space-x-2">
                        <button
                            onClick={() => onEdit?.(product)}
                            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete?.(product.id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;