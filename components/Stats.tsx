"use client"
import { trpc } from '@/src/utils/trpc';
import React from 'react'

const Stats = () => {
    const { data: stats } = trpc.order.getOrderStats.useQuery();
  return (
    <>
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
         <div className="text-gray-400 text-sm">Total Orders</div>
         <div className="text-cyan-400 text-2xl font-bold mt-1">{stats?.totalOrders}</div>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
         <div className="text-gray-400 text-sm">Pending</div>
         <div className="text-amber-400 text-2xl font-bold mt-1">{stats?.pendingOrders}</div>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
         <div className="text-gray-400 text-sm">Delivered</div>
         <div className="text-emerald-400 text-2xl font-bold mt-1">{stats?.deliveredOrders}</div>
        </div>
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
         <div className="text-gray-400 text-sm">Processing</div>
         <div className="text-blue-700 text-2xl font-bold mt-1">{stats?.processingOrders}</div>
        </div>
    </>
  )
}

export default Stats