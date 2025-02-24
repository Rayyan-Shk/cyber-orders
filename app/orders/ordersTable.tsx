// @ts-nocheck
"use client";
import { useState, useEffect, useRef } from "react";
import { trpc } from "@/src/utils/trpc";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, RefreshCw, ChevronLeft, ChevronRight, Package, MapPin, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function OrdersTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 10;
  
  // Create ref for the search input
  const searchInputRef = useRef(null);
  // Track if the input should maintain focus
  const [inputFocused, setInputFocused] = useState(false);

  // Simple debounce implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search])

  const { data, isLoading, refetch } = trpc.order.getOrders.useQuery({
    search: debouncedSearch,
    page,
    limit,
  });
  
  // Restore focus after re-render if it was focused before
  useEffect(() => {
    if (inputFocused && searchInputRef.current) {
      searchInputRef.current.focus();
      
      // Preserve cursor position at the end of text
      const length = searchInputRef.current.value.length;
      searchInputRef.current.setSelectionRange(length, length);
    }
  }, [data, inputFocused]);

  const totalPages = data ? Math.ceil(data.total / limit) : 1;

  // Function to determine badge color based on status
  const getStatusColor = (status) => {
    const statusMap = {
      "pending": "bg-amber-900 text-amber-300",
      "processing": "bg-blue-900 text-blue-300",
      "shipped": "bg-indigo-900 text-indigo-300",
      "delivered": "bg-emerald-900 text-emerald-300",
      "cancelled": "bg-red-900 text-red-300",
    };
    
    // Convert status to lowercase and check if it exists in our map
    const lowerStatus = status.toLowerCase();
    return statusMap[lowerStatus] || "bg-gray-800 text-gray-300";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-black rounded-xl">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="animate-spin h-8 w-8 text-cyan-500" />
          <p className="text-gray-400 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black border border-gray-800 shadow-xl rounded-xl overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-gray-900 to-black p-6 border-b border-gray-800">
        <h2 className="text-gray-100 text-2xl font-bold">Orders <span className="text-cyan-400">Dashboard</span></h2>
        <p className="text-gray-500 mt-1">Manage and track all customer orders</p>
      </div>
      
      {/* Search and actions bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-gray-900 border-b border-gray-800">
        <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 block w-full rounded-md shadow-sm placeholder-gray-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
        </div>
        <Button 
          onClick={() => refetch()}
          className="bg-cyan-600 hover:bg-cyan-700 text-gray-100 flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-800">
              <TableHead className="px-6 py-3 font-semibold text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-cyan-500" />
                  Customer
                </div>
              </TableHead>
              <TableHead className="px-6 py-3 font-semibold text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-cyan-500" />
                  Address
                </div>
              </TableHead>
              <TableHead className="px-6 py-3 font-semibold text-gray-400">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-cyan-500" />
                  Status
                </div>
              </TableHead>
              <TableHead className="px-6 py-3 font-semibold text-gray-400">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-cyan-500" />
                  Items
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No orders found. Try adjusting your search.
                </TableCell>
              </TableRow>
            ) : (
              data?.orders.map((order, index) => (
                <TableRow 
                  key={order.id}
                  className="border-b border-gray-800 hover:bg-gray-900"
                >
                  <TableCell className="px-6 py-4 font-medium text-gray-300">{order.customerName}</TableCell>
                  <TableCell className="px-6 py-4 text-gray-400">{order.address}</TableCell>
                  <TableCell className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.fulfillmentStatus)}`}>
                      {order.fulfillmentStatus}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {order.orderLineItems.map((item) => (
                        <Badge 
                          key={item.id} 
                          variant="outline"
                          className="bg-gray-800 text-cyan-400 border-gray-700"
                        >
                          {item.product} (x{item.quantity})
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center p-6 bg-gray-900 border-t border-gray-800">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="border-gray-700 text-gray-400 hover:bg-cyan-200 flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <span className="bg-gray-800 text-cyan-400 px-3 py-1 rounded-md font-medium">{page}</span>
          <span className="text-gray-500">of {totalPages}</span>
        </div>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="border-gray-700 text-gray-400 hover:bg-cyan-200 flex items-center gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}