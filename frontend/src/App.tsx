import React from 'react';
import './App.css';

function App() {
  return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">
              🛍️ E-commerce Store
            </h1>
            <p className="text-gray-600">
              Your React frontend connected to Spring Boot backend
            </p>
          </header>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Frontend is Ready! ✨
              </h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span>React TypeScript app running</span>
                </div>

                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span>Tailwind CSS configured</span>
                </div>

                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span>Ready to connect to Spring Boot API</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  View Products
                </button>

                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors">
                  Login / Register
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Next Steps:
              </h3>
              <ul className="text-blue-700 space-y-2">
                <li>• Build authentication pages (Login/Register)</li>
                <li>• Create product catalog connected to your API</li>
                <li>• Add shopping cart functionality</li>
                <li>• Implement user dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
