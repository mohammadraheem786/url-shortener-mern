import React from 'react'
import { Link } from '@tanstack/react-router'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200 animate-fade-down transition-all duration-500 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-15 items-center">
          
          {/* Left - Logo / Title */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-purple-700 hover:text-purple-900 transition-colors duration-300"
            >
              🔗 URL Shortener
            </Link>
          </div>

          <div className="flex items-center space-x-4">
           <Link
              to="/auth/login"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-300 shadow-sm hover:shadow-md"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-300 shadow-sm hover:shadow-md"
            >
              Signup
            </Link>
              {/* <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                Logout
              </button>
            */}
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
