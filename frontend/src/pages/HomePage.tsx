import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ApiTest from '../components/common/ApiTest';

const HomePage: React.FC = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block">Welcome to</span>
                        <span className="block text-blue-600">E-commerce Store 🛍️</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Your complete full-stack shopping experience with React TypeScript frontend
                        and Spring Boot backend with JWT authentication.
                    </p>

                    {!isAuthenticated ? (
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <div className="rounded-md shadow">
                                <Link
                                    to="/register"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
                                >
                                    Get started
                                </Link>
                            </div>
                            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                <Link
                                    to="/login"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <div className="rounded-md shadow">
                                <Link
                                    to="/dashboard"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
                                >
                                    Go to Dashboard
                                </Link>
                            </div>
                            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                <Link
                                    to="/products"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors"
                                >
                                    Browse Products
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Status */}
                {isAuthenticated && (
                    <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="flex items-center">
                            <svg className="h-6 w-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="text-lg font-medium text-green-800">
                                    Welcome back, {user?.firstName} {user?.lastName}! 👋
                                </h3>
                                <p className="mt-1 text-sm text-green-700">
                                    You're successfully authenticated. Your JWT token is working perfectly!
                                    {user?.role === 'ADMIN' && (
                                        <span className="ml-2 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Admin User
                    </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* API Status */}
                <div className="mb-8">
                    <ApiTest />
                </div>

                {/* Feature Grid */}
                <div className="mt-16">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Full-Stack Features
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                            Everything you need for a modern e-commerce application
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Secure Authentication</h3>
                            <p className="text-gray-500">JWT-based authentication with Spring Security and password hashing.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-4">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Product Management</h3>
                            <p className="text-gray-500">Full CRUD operations for products with search and filtering capabilities.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-4">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">User Dashboard</h3>
                            <p className="text-gray-500">Personalized user dashboard with profile management and role-based access.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;