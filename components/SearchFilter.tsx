// SearchFilter.tsx
"use client";
import React, { forwardRef } from "react";
import { Search } from "lucide-react";

export interface SearchFilterProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const SearchFilter = forwardRef<HTMLInputElement, SearchFilterProps>((props, ref) => {
  return (
    <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-500" />
      </div>
      <input
        {...props}
        ref={ref}
        type="text"
        placeholder="Search orders..."
        className={`pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 block w-full rounded-md shadow-sm placeholder-gray-500 ${props.className || ""}`}
      />
    </div>
  );
});

SearchFilter.displayName = "SearchFilter";

export default SearchFilter;
