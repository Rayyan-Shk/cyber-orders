"use client";
import { useState, useEffect, useRef } from "react";
import { trpc } from "@/src/utils/trpc";
import { Button } from "@/components/ui/button";
import { RefreshCw} from "lucide-react";
import Loader from "@/components/Loader";
import TableMain from "@/components/TableMain";
import Navigation from "@/components/Navigation";
import SearchFilter from "@/components/SearchFilter";
import TableHeader from "@/components/TableHeader";

export default function OrdersTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 10;
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search])

  const { data, isLoading, refetch } = trpc.order.getOrders.useQuery({
    search: debouncedSearch,
    page,
    limit,
  });
  
  useEffect(() => {
    if (inputFocused && searchInputRef.current) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          const length = searchInputRef.current.value.length;
          searchInputRef.current.setSelectionRange(length, length);
        }
      }, 0);
    }
  }, [data, inputFocused]);

  const totalPages = data ? Math.ceil(data.total / limit) : 1;

  return (
    <div className="bg-black border border-gray-800 shadow-xl rounded-xl overflow-hidden">
      <TableHeader />

      <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-gray-900 border-b border-gray-800">
        <SearchFilter
          ref={searchInputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        <Button 
          onClick={() => refetch()}
          className="bg-cyan-600 hover:bg-cyan-700 text-gray-100 flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <Loader />
        </div>
      ) : (
        <>
          <TableMain key={`table-${page}-${debouncedSearch}`} data={data} />
          <Navigation page={page} setPage={setPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}