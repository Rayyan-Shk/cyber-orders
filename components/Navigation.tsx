"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { trpc } from '@/src/utils/trpc';

type NavigationProps = {
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number,
  };

const Navigation = ({ page, setPage, totalPages }: NavigationProps) => {
    const limit = 10;

    const { data } = trpc.order.getOrders.useQuery({
        limit,
      });
  return (
    
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
  )
}

export default Navigation