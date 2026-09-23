"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/services?searchTerm=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/services");
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white py-16 md:py-24 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
          🔧 Your Trusted Home Service Platform
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Qualified Technicians, <br className="hidden sm:inline" />
          <span className="text-blue-600">Delivered Right to Your Door.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed">
          From plumbing leakages and electrical wiring to deep house cleaning — book background-verified experts with transparent pricing and live booking tracking.
        </p>

        {/* Quick Search Form */}
        <form
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-2xl shadow-lg border border-gray-200 mt-6"
        >
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for 'tap repair', 'circuit breaker', 'ac cleaning'..."
            className="flex-1 border-0 shadow-none focus-visible:ring-0 text-base"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl">
            Find Service
          </Button>
        </form>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500 pt-2">
          <span className="font-semibold text-gray-600">Popular:</span>
          {["Plumbing", "Electrical", "AC Repair", "Cleaning"].map((tag) => (
            <button
              key={tag}
              onClick={() => router.push(`/services?searchTerm=${tag}`)}
              className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}