"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { BookingStatus, ITechBookingItem } from "@/lib/types";
import TechStatusButton from "./TechnicianStatusBtn";

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

export default function TechnicianBookingCard({ booking }: { booking: ITechBookingItem }) {
  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900">{booking.service?.title}</h3>
            <StatusBadge status={booking.status} />
          </div>
          <p className="text-xs text-gray-400 mt-1">Booking Ref: {booking.id}</p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-2xl font-black text-gray-900">${booking.totalAmount}</span>
          <span className="text-xs text-gray-400 block font-medium">Payout Estimation</span>
        </div>
      </div>

      {/* Customer & Location Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 py-1">
        <div>
          <span className="font-semibold text-gray-700">Customer:</span> {booking.customer?.name}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Email:</span> {booking.customer?.email}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Scheduled Date:</span>{" "}
          {new Date(booking.scheduledAt).toLocaleString()}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Location:</span> {booking.address}
        </div>
        {booking.notes && (
          <div className="md:col-span-2 text-xs bg-amber-50/60 p-3 rounded-lg border border-amber-100 text-amber-900">
            <span className="font-bold">Customer Notes:</span> {booking.notes}
          </div>
        )}
      </div>

      {/* Action Buttons based on Status */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
        
        {/* 1. When REQUESTED: Accept or Decline */}
        {booking.status === "REQUESTED" && (
          <div className="flex items-center gap-2">
            <TechStatusButton
              bookingId={booking.id}
              status="DECLINED"
              label="Decline"
              variant="outline"
              className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
            />
            <TechStatusButton
              bookingId={booking.id}
              status="ACCEPTED"
              label="Accept Booking"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            />
          </div>
        )}

        {/* 2. When ACCEPTED: Waiting for Customer Payment */}
        {booking.status === "ACCEPTED" && (
          <span className="text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-lg">
            ⏳ Accepted • Waiting for Customer Payment
          </span>
        )}

        {/* 3. When PAID: Technician starts the job */}
        {booking.status === "PAID" && (
          <TechStatusButton
            bookingId={booking.id}
            status="IN_PROGRESS"
            label="🛠️ Start Work (In-Progress)"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
          />
        )}

        {/* 4. When IN_PROGRESS: Technician completes the job */}
        {booking.status === "IN_PROGRESS" && (
          <TechStatusButton
            bookingId={booking.id}
            status="COMPLETED"
            label="✓ Complete Job"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
          />
        )}

        {/* 5. When COMPLETED */}
        {booking.status === "COMPLETED" && (
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
            ✓ Job Completed
          </span>
        )}

        {/* 6. When CANCELLED or DECLINED */}
        {(booking.status === "CANCELLED" || booking.status === "DECLINED") && (
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
            Closed
          </span>
        )}
      </div>
    </Card>
  );
}