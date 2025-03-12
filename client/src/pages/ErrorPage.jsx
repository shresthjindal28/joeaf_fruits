import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-yellow-50 flex flex-col items-center justify-center p-8">
      {/* Animated Icons Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <i className="fa-solid fa-apple-alt text-green-300 text-6xl absolute top-20 left-20 animate-float" />
        <i className="fa-solid fa-lemon text-yellow-300 text-8xl absolute xl:top-1/2 top-20 xl:right-32 right-10 animate-spin" />
        <i className="fa-solid fa-seedling text-amber-400 text-5xl absolute xl:top-90 top-30 xl:left-20 sm:right-70 right-50 animate-pulse" />
        <i className="fa-solid fa-pagelines text-green-400 text-7xl absolute xl:top-20 top-120 xl:left-230 sm:left-20 animate-bounce" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl h-dvh">
        {/* Error Code */}
        <h1 className="text-9xl font-bold mb-8 bg-gradient-to-r from-green-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
          404
        </h1>

        {/* Error Message */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-4 border-green-100">
          <i className="fa-solid fa-triangle-exclamation text-amber-500 text-5xl mb-6" />
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            Page Not Found!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Oops! The fruit you're looking for seems to have rolled away. 
            Let's get you back to our orchard of fresh delights!
          </p>
          
          {/* Home Button */}
          <Link 
            to="/" 
            className="sm:text-lg text-md inline-block bg-gradient-to-r from-green-500 to-amber-500 hover:from-green-600 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-300"
          >
            <i className="fa-solid fa-leaf mr-2" />
            Go Back to Freshness
          </Link>
        </div>

        {/* Additional Message */}
        <p className="text-gray-500 mt-8 text-sm h-max">
          Still lost? Try our search feature or check our 
          <Link to="/products" className="text-green-600 hover:text-amber-600 ml-1">
            seasonal fruits collection
          </Link>
        </p>
      </div>

      {/* Footer */}
      <footer className="absolute sm:top-140 top-180 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} FreshFruits Market - Nourishing Naturally
      </footer>
    </div>
  );
};

export default ErrorPage;