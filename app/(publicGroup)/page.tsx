import React from "react";
import HeroSection from "./_components/HeroSection";
import CategoryGrid from "./_components/CategoryGrid";
import FeaturedServices from "./_components/FeaturedServices";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Category Grid */}
      <CategoryGrid />

      {/* 3. Featured Top Services */}
      <FeaturedServices />

      {/* 4. Trust Badges / Why Choose Us */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900">Why Homeowners Trust FixItNow</h2>
          <p className="text-gray-500 text-sm">Every booking is backed by quality guarantees and verified technicians.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-2">
            <div className="text-3xl">🛡️</div>
            <h3 className="font-bold text-gray-900 text-lg">Verified Professionals</h3>
            <p className="text-xs text-gray-500">Every technician undergoes background verification and skill tests.</p>
          </div>
          <div className="p-6 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-2">
            <div className="text-3xl">💳</div>
            <h3 className="font-bold text-gray-900 text-lg">Secure Stripe Payments</h3>
            <p className="text-xs text-gray-500">Pay safely online only after the technician accepts your booking.</p>
          </div>
          <div className="p-6 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-2">
            <div className="text-3xl">⭐</div>
            <h3 className="font-bold text-gray-900 text-lg">Transparent Reviews</h3>
            <p className="text-xs text-gray-500">Read honest feedback and star ratings from verified completed bookings.</p>
          </div>
        </div>
      </section>
    </div>
  );
}