import React from "react";
import { Card } from "@/components/ui/card";
import { ITechBookingItem } from "@/lib/types";
import TechnicianBookingCard from "./TechnicianBookingCard";
import { getBookingAction } from "../_actions/getBookingAction";


export default async function BookingsList() {
  // Fetch data inside this dedicated server component
  const res = await getBookingAction();
  const bookings: ITechBookingItem[] = res?.success && res?.data ? res.data : [];

  if (bookings.length === 0) {
    return (
      <Card className="p-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <p className="font-semibold text-gray-700 text-base">No appointments yet</p>
        <p className="text-xs text-gray-400 mt-1">
        No Booking Available
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <TechnicianBookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}