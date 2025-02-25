import React from 'react'

const TableHeader = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black p-6 border-b border-gray-800">
        <h2 className="text-gray-100 text-2xl font-bold">Orders <span className="text-cyan-400">Table</span></h2>
        <p className="text-gray-500 mt-1">Manage and track all customer orders</p>
    </div>
  )
}

export default TableHeader