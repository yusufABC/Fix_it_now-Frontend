import React, { Suspense } from "react";
import BookingsSkeleton from "./_components/BookingsSkeleton";
import BookingsList from "./_components/BookingsList";


export default function CustomerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            My Appointments
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track your service requests, complete payments, and manage booking history.
          </p>
        </div>

        {/* Bookings Streamed via Suspense */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Booking History</h2>
          
          <Suspense fallback={<BookingsSkeleton />}>
            <BookingsList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}