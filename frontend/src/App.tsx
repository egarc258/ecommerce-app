import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
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

              {/* Protected Routes */}
              <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
              />

              {/* Placeholder for future routes */}
              <Route
                  path="/products"
                  element={
                    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                      <div className="text-center bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Products Page</h2>
                        <p className="text-gray-600">Coming soon! This will show the product catalog.</p>
                      </div>
                    </div>
                  }
              />

              {/* Admin Routes (for future) */}
              <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute adminOnly>
                      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                        <div className="text-center bg-white p-8 rounded-lg shadow-md">
                          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Products</h2>
                          <p className="text-gray-600">Coming soon! Admin product management.</p>
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
              />

              {/* 404 Page */}
              <Route
                  path="*"
                  element={
                    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                        <p className="text-gray-600">Page not found</p>
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
