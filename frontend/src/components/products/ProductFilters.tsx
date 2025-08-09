import React, { useState } from 'react';

interface ProductFiltersProps {
    onSearch: (query: string) => void;
    onPriceFilter: (minPrice: number, maxPrice: number) => void;
    onClearFilters: () => void;
    loading?: boolean;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
                                                           onSearch,
                                                           onPriceFilter,
                                                           onClearFilters,
                                                           loading = false
                                                       }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    const handlePriceFilter = () => {
        const min = parseFloat(minPrice) || 0;
        const max = parseFloat(maxPrice) || 10000;
        onPriceFilter(min, max);
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setMinPrice('');
        setMaxPrice('');
        onClearFilters();
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* Search */}
                <div className="md:col-span-2">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                        Search Products
                    </label>
                    <form onSubmit={handleSearchSubmit} className="flex">
                        <input
                            type="text"
                            id="search"
                            placeholder="Search by name or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors disabled:opacity-50"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Range
                    </label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-20 px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-gray-500 self-center">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-20 px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <button
                        onClick={handlePriceFilter}
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        Filter
                    </button>
                    <button
                        onClick={handleClearFilters}
                        disabled={loading}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductFilters;