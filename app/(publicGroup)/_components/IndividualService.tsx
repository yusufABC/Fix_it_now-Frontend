"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BookingModal from "@/components/shared/BookingModel"; // or BookingModal
import { IService } from "@/lib/types";

export default function GetIndividualService({ service }: { service: IService }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-blue-600 transition">Services</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-xs">{service.title}</span>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT 2 COLUMNS: Service Details & Technician Info         */}
          {/* ========================================================= */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Main Service Overview Card */}
            <Card className="p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {service.category?.name || "General Service"}
                </span>
                <span className="text-xs text-gray-400">• Verified Service</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {service.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-600 pt-1">
                <div className="flex items-center gap-1 font-semibold text-gray-900">
                  <span className="text-yellow-400 text-base">★</span>
                  <span>{service.technician?.averageRating ?? 5.0}</span>
                  <span className="text-gray-400 font-normal">
                    ({service.technician?.totalReviews ?? 0} reviews)
                  </span>
                </div>
                <span>•</span>
                <span>📍 {service.technician?.location || "Dhaka"}</span>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-2">Service Description</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
              </div>

              {/* What's Included */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <h3 className="text-base font-bold text-gray-900">What is included:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span> On-site diagnosis & inspection
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span> Complete labor & tools
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span> Post-service cleanup
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span> 7-day service warranty
                  </li>
                </ul>
              </div>
            </Card>

            {/* 2. Technician Profile Card */}
            <Card className="p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-gray-900">About the Technician</h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                    {service.technician?.user?.name?.charAt(0) || "T"}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
                      {service.technician?.user?.name || "Professional Technician"}
                      <span className="text-blue-500 text-sm" title="Verified Technician">✓</span>
                    </h3>
                    <p className="text-xs text-gray-500">
                      {service.technician?.yearOfExperience || 0}+ years of field experience
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200">
                    ● Available for Booking
                  </span>
                </div>
              </div>

              {/* Skills Tags */}
              {service.technician?.skills && service.technician.skills.length > 0 && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Specialized Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.technician.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Sticky Booking / Pricing Box                */}
          {/* ========================================================= */}
          <div className="lg:col-span-1 lg:sticky lg:top-8">
            <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg space-y-6">
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Service Fee</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-black text-gray-900">${service.price}</span>
                  <span className="text-xs text-gray-500">/ job estimation</span>
                </div>
              </div>

              <div className="space-y-3 py-4 border-y border-gray-100 text-xs text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Booking Confirmation</span>
                  <span className="font-semibold text-gray-800">Direct Confirmation</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Payment</span>
                  <span className="font-semibold text-gray-800">Secure Online via Stripe</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cancellation</span>
                  <span className="font-semibold text-emerald-600">Free before job starts</span>
                </div>
              </div>

              {/* Book Now Button triggers client modal */}
              <Button
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-base rounded-xl shadow-md transition-transform hover:scale-[1.02]"
              >
                Book This Service Now
              </Button>

              <div className="text-center space-y-1">
                <p className="text-xs text-gray-400">🔒 100% Secure Checkout Guarantee</p>
                <p className="text-[11px] text-gray-400">Pay only after the technician accepts your request.</p>
              </div>
            </Card>
          </div>

        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={service.id}
      />
    </div>
  );
}