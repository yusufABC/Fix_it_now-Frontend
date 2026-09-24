"use client";

// import React, { useActionState, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IBooking, BookingStatus } from "@/lib/types";
import { toast } from "sonner";
// import { cencelBookingAction } from "../_actions/bookingAction";
// import { payBookingAction } from "../_actions/payBookingAction";
import { HandlePayButton } from "./HandlePayButton";
import HandleCancelButton from "./HandleCancelButton";

// Colored status badge
function StatusBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    REQUESTED: "bg-amber-50 text-amber-700 border-amber-200",
    ACCEPTED: "bg-blue-50 text-blue-700 border-blue-200",
    DECLINED: "bg-red-50 text-red-700 border-red-200",
    PAID: "bg-purple-50 text-purple-700 border-purple-200",
    IN_PROGRESS: "bg-indigo-50 text-indigo-700 border-indigo-200",
    COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    CANCELLED: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
}

export default function BookingCard({ booking }: { booking: IBooking }) {
  // const [loading, setLoading] = useState(false);

  // // 1. Handle Stripe Checkout Trigger


  // 2. Handle Cancel
  // const handleCancel = async () => {
  //   if (!confirm("Are you sure you want to cancel this booking?")) return;
  //   setLoading(true);
  //   const res = await cencelBookingAction(booking.id);
  //   setLoading(false);

  //   if (res.success) {
  //     toast.success("Booking cancelled successfully");
  //   } else {
  //     toast.error(res.message || "Could not cancel booking");
  //   }
  // };

  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4">
      {/* Top Header: Service Title, Status, Price */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900">{booking.service?.title}</h3>
            <StatusBadge status={booking.status} />
          </div>
          <p className="text-xs text-gray-500 mt-1">Booking ID: {booking.id}</p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-2xl font-black text-gray-900">${booking.totalAmount}</span>
        </div>
      </div>

      {/* Booking Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 py-1">
        <div>
          <span className="font-semibold text-gray-700">Scheduled Date:</span>{" "}
          {new Date(booking.scheduledAt).toLocaleString()}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Technician:</span>{" "}
          {booking.technician?.user?.name} ({booking.technician?.location})
        </div>
        <div className="md:col-span-2">
          <span className="font-semibold text-gray-700">Address:</span> {booking.address}
        </div>
        {booking.notes && (
          <div className="md:col-span-2 text-xs bg-gray-50 p-2.5 rounded-lg border border-gray-100 text-gray-600">
            <span className="font-bold text-gray-700">Notes:</span> {booking.notes}
          </div>
        )}
      </div>

      {/* Conditional Action Buttons */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
        {/* Cancel button: Only allowed on REQUESTED or ACCEPTED */}
        {/* {(booking.status === "REQUESTED" || booking.status === "ACCEPTED") && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
            disabled={loading}
            className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
          >
            Cancel Booking
          </Button>
        )} */}
        {booking.status==='REQUESTED' &&(

        <HandleCancelButton bookingId={booking.id} />
        )}

        {/* Pay button: Only on ACCEPTED */}
        {booking.status === "ACCEPTED" && (
      <HandlePayButton bookingId={booking.id} />
        )}

        {/* Review button: Only on COMPLETED */}
        {booking.status === "COMPLETED" && (
          <Button
            size="sm"
            onClick={() => toast.info("Opening review modal...")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
          >
            ⭐ Leave Review
          </Button>
        )}
      </div>
    </Card>
  );
}