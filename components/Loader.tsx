import { RefreshCcw } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64 bg-black rounded-xl">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCcw className="animate-spin h-8 w-8 text-cyan-500" />
          <p className="text-gray-400 font-medium">Loading orders...</p>
        </div>
    </div>
  )
}

export default Loader