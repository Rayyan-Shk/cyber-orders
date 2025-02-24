import React from 'react'

const Navbar = () => {
  return (
    <nav className="border-b border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16">
            <div className="flex items-center">
              <span className="text-cyan-500 text-xl font-bold">CyberOrders</span>
            </div>
          </div>
        </div>
    </nav>
  )
}

export default Navbar