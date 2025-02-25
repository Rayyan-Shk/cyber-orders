"use client";
import { trpc } from "@/src/utils/trpc";
import OrdersTable from "./ordersTable";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Stats from "@/components/Stats";

export default function OrdersPage() {
  const { data: stats, isLoading, error } = trpc.order.getOrderStats.useQuery();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <Navbar/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          <div className="lg:w-1/4">
            <div className="sticky top-8">
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 mt-2">Manage your orders and inventory with ease</p>

              <div className="mt-8 space-y-4">
                {isLoading ? (
                    <Loader/>
                ) : error ? (
                  <p className="text-red-400">Error loading stats</p>
                ) : (
                  <>
                  <Stats/>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <OrdersTable />
          </div>
        </div>
      </main>
    </div>
  );
}
