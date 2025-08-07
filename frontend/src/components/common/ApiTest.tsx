import React, { useState, useEffect } from 'react';
import { healthAPI, productAPI } from '../../services/api';
import { Product } from '../../types';

const ApiTest: React.FC = () => {
    const [healthStatus, setHealthStatus] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const testAPI = async () => {
            try {
                // Test health endpoint
                const health = await healthAPI.check();
                setHealthStatus(health);

                // Test products endpoint
                const productsResponse = await productAPI.getProducts(0, 5);
                setProducts(productsResponse.content);

            } catch (err: any) {
                console.error('API Test Error:', err);
                setError(err.message || 'Failed to connect to backend API');
            } finally {
                setLoading(false);
            }
        };

        testAPI();
    }, []);

    if (loading) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">🔄 Testing API connection...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-800 mb-2">❌ API Connection Failed</h3>
                <p className="text-red-700 mb-2">Error: {error}</p>
                <p className="text-sm text-red-600">
                    Make sure your Spring Boot backend is running on http://localhost:8080
                </p>
            </div>
        );
    }

    return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800 mb-4">✅ API Connection Successful!</h3>

            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-green-700">Health Check:</h4>
                    <p className="text-green-600">"{healthStatus}"</p>
                </div>

                <div>
                    <h4 className="font-semibold text-green-700">Products Found: {products.length}</h4>
                    {products.length > 0 ? (
                        <div className="mt-2 space-y-2">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white p-3 rounded border">
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-sm text-gray-600">${product.price}</p>
                                    <p className="text-xs text-gray-500">Stock: {product.stockQuantity}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-green-600 text-sm">No products in database yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApiTest;