"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { STATIC_CATEGORIES } from "./CategoryGrid";

interface ServiceFiltersProps {
  onFilterChange: (filters: {
    searchTerm: string;
    categoryId: string;
    minPrice: string;
    maxPrice: string;
    location: string;
  }) => void;
}

export default function ServiceFilters({ onFilterChange }: ServiceFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ searchTerm, categoryId, minPrice, maxPrice, location });
  };

  const handleReset = () => {
    setSearchTerm("");
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    setLocation("");
    onFilterChange({ searchTerm: "", categoryId: "", minPrice: "", maxPrice: "", location: "" });
  };

  return (
    <Card className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-base">Filter Services</h3>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-blue-600 hover:underline font-medium"
        >
          Reset
        </button>
      </div>

      <form onSubmit={handleApply} className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Search Keyword</label>
          <Input
            type="text"
            placeholder="e.g. Pipe, Wiring, Cleaning..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full text-sm rounded-md border border-gray-200 p-2 bg-white focus:outline-none focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {STATIC_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
          <Input
            type="text"
            placeholder="e.g. Gulshan, Dhanmondi..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Price Range ($)</label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <span className="text-gray-400 text-xs">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
          Apply Filters
        </Button>
      </form>
    </Card>
  );
}