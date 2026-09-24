import React from "react";
import { Card } from "@/components/ui/card";
import { IBooking } from "@/lib/types";
import { getMyBookingsAction } from "../_actions/getMyBookingAction";
import BookingCard from "./bookingCard";

export default async function BookingsList() {
  // Fetch data inside this dedicated server component
  const res = await getMyBookingsAction();
  const bookings: IBooking[] = res?.success && res?.data ? res.data : [];

  if (bookings.length === 0) {
    return (
      <Card className="p-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <p className="font-semibold text-gray-700 text-base">No appointments yet</p>
        <p className="text-xs text-gray-400 mt-1">
          When you book a service, it will appear here for live tracking.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}