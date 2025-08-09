import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminProductsPage from './pages/AdminProductsPage';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-100">
                    <Navbar />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/products/:id" element={<ProductDetailPage />} />

                        {/* Protected Routes */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <DashboardPage />
                                </ProtectedRoute>
                            }
                        />

                        {/* Admin Routes */}
                        <Route
                            path="/admin/products"
                            element={
                                <ProtectedRoute adminOnly>
                                    <AdminProductsPage />
                                </ProtectedRoute>
                            }
                        />

                        {/* 404 Page */}
                        <Route
                            path="*"
                            element={
                                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                                    <div className="text-center bg-white p-8 rounded-lg shadow-md">
                                        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                                        <p className="text-gray-600 mb-4">Page not found</p>
                                        <a href="/" className="text-blue-600 hover:text-blue-500">
                                            Return to Home
                                        </a>
                                    </div>
                                </div>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
