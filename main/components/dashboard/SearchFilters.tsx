"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { interestTags } from "@/lib/constants";

interface SearchFilters {
  searchQuery: string;
  dateFrom: string;
  dateTo: string;
  priceMin: number | null;
  priceMax: number | null;
  tags: string[];
}

interface EventSearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
}

export default function EventSearchFilters({
  onSearch,
  onClear,
}: EventSearchFiltersProps) {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: "",
    dateFrom: "",
    dateTo: "",
    priceMin: null,
    priceMax: null,
    tags: [],
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    const clearedFilters = {
      searchQuery: "",
      dateFrom: "",
      dateTo: "",
      priceMin: null,
      priceMax: null,
      tags: [],
    };
    setFilters(clearedFilters);
    setShowMoreFilters(false);
    onClear();
  };

  const hasActiveFilters =
    filters.searchQuery ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.priceMin ||
    filters.priceMax;

  const toggleTag = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <div className=" pt-6 lg:px-5 pb-4 bg-transparent">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="flex gap-3 items-stretch">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 lg:size-6 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search"
              value={filters.searchQuery}
              onChange={(e) => {
                const newFilters = { ...filters, searchQuery: e.target.value };
                setFilters(newFilters);
                onSearch(newFilters);
              }}
              className="w-full pl-10 pr-4 py-2.5 lg:pl-12 lg:py-3 lg:text-base lg:font-medium bg-neutral-100 border border-neutral-200 rounded-lg text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="px-6 lg:px-9 lg:py-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-sm lg:text-base font-medium rounded-md"
          >
            Search
          </Button>
        </div>

        {/* Filter Row */}
        <div className="flex gap-3 items-center flex-wrap">
          {/* Date Range Filter */}
          {/* <div className="flex items-center gap-2 px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer">
            <span className="text-sm font-medium text-neutral-700">
              {filters.dateFrom && filters.dateTo
                ? `${formatDate(filters.dateFrom)} - ${formatDate(
                    filters.dateTo
                  )}`
                : "Select dates"}
            </span>
            <ChevronDown className="size-4 text-neutral-600" />
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) =>
                setFilters({ ...filters, dateFrom: e.target.value })
              }
              className="absolute opacity-0 w-0 h-0"
            />
          </div> */}

          {/* Price Filter */}
          <div className="flex items-center gap-2 px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer group relative">
            <span className="text-sm font-medium text-neutral-700">
              {filters.priceMin || filters.priceMax
                ? `$${filters.priceMin || 0} - $${filters.priceMax || "∞"}`
                : "Any seats"}
            </span>
            <ChevronDown className="size-4 text-neutral-600" />

            {/* Price Range Dropdown */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-neutral-600 block mb-1">
                    Min Seats
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.priceMin || ""}
                    onChange={(e) => {
                      const newFilters = {
                        ...filters,
                        priceMin: e.target.value
                          ? Number.parseInt(e.target.value)
                          : null,
                      };
                      setFilters(newFilters);
                      onSearch(newFilters);
                    }}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-600 block mb-1">
                    Max Seats
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={filters.priceMax || ""}
                    onChange={(e) => {
                      const newFilters = {
                        ...filters,
                        priceMax: e.target.value
                          ? Number.parseInt(e.target.value)
                          : null,
                      };
                      setFilters(newFilters);
                      onSearch(newFilters);
                    }}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* More Filters Button */}
          <button
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors text-sm font-medium text-neutral-700"
          >
            <span>Date range</span>
            <ChevronDown
              className={cn(
                "size-4 text-neutral-600 transition-transform",
                showMoreFilters && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Date Range Picker for better UX */}
        {showMoreFilters && (
          <div className="grid grid-cols-2 lg:grid-cols-1 lg:max-w-100 lg:min-h-50 gap-3 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
            <div>
              <label className="text-xs font-medium text-neutral-600 block mb-2">
                From Date
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => {
                  const newFilters = { ...filters, dateFrom: e.target.value };
                  setFilters(newFilters);
                  onSearch(newFilters);
                }}
                className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-600 block mb-2">
                To Date
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => {
                  const newFilters = { ...filters, dateTo: e.target.value };
                  setFilters(newFilters);
                  onSearch(newFilters);
                }}
                className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        <div className="lg:mt-8">
          <label className="text-xs lg:text-lg font-medium text-neutral-600 block mb-3">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 lg:gap-3">
            {interestTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  const newTags = filters.tags.includes(tag)
                    ? filters.tags.filter((t) => t !== tag)
                    : [...filters.tags, tag];
                  const newFilters = { ...filters, tags: newTags };
                  setFilters(newFilters);
                  onSearch(newFilters);
                }}
                className={cn(
                  "px-3 lg:px-4 py-1.5 rounded-2xl text-xs lg:text-base font-medium border transition-colors",
                  filters.tags.includes(tag)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
