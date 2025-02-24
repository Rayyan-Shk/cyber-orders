"use client"; // Ensure it's a client component
import { trpc } from "@/src/utils/trpc"; // Import your tRPC hook
import OrdersTable from "./ordersTable";
import { RefreshCw } from "lucide-react"; // Import the loading icon

export default function OrdersPage() {
  const { data: stats, isLoading, error } = trpc.order.getOrderStats.useQuery();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Navigation bar */}
      <nav className="border-b border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16">
            <div className="flex items-center">
              <span className="text-cyan-500 text-xl font-bold">CyberOrders</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content area with sidebar layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-8">
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 mt-2">Manage your orders and inventory with ease</p>

              {/* Optional: Quick stats or navigation */}
              <div className="mt-8 space-y-4">
                {isLoading ? (
                  // ✅ Loading state with spinner
                  <div className="flex justify-center items-center h-64 bg-black rounded-xl">
                    <div className="flex flex-col items-center space-y-4">
                      <RefreshCw className="animate-spin h-8 w-8 text-cyan-500" />
                      <p className="text-gray-400 font-medium">Loading orders...</p>
                    </div>
                  </div>
                ) : error ? (
                  <p className="text-red-400">Error loading stats</p>
                ) : (
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
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right content area - OrdersTable */}
          <div className="lg:w-3/4">
            <OrdersTable />
          </div>
        </div>

        {/* Footer content */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm">
          <p className="text-center">© 2025 Your Company. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
}
