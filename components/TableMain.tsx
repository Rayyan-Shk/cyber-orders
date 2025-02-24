import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { MapPin, Package, Tag, User } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

type TableMainProps = {
    data: {
        page: number;
        limit: number;
        orders: {
            id: number;
            customerName: string;
            address: string;
            fulfillmentStatus: string;
            createdAt: string;
            orderLineItems: {
                id: number;
                product: string;
                quantity: number;
                orderId: number;
            }[];
        }[];
        total: number;
    } | undefined
  };

const TableMain = ({data}: TableMainProps) => {
    const getStatusColor = (status: string) => {
        const statusMap: Record<string, string> = {
          "pending": "bg-amber-900 text-amber-300",
          "processing": "bg-blue-900 text-blue-300",
          "shipped": "bg-indigo-900 text-indigo-300",
          "delivered": "bg-emerald-900 text-emerald-300",
          "cancelled": "bg-red-900 text-red-300",
        };
    
        const lowerStatus = status.toLowerCase();
        return statusMap[lowerStatus] || "bg-gray-800 text-gray-300";
      };

  return (
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
              data?.orders.map((order ) => (
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
                      {(order as any).orderLineItems?.map((item: { id: string; product: string; quantity: number }) => (
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
  )
}

export default TableMain