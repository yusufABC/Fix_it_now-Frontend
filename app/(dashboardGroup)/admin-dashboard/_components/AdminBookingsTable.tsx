import React from "react";
import { Card } from "@/components/ui/card";
import { BookingStatus } from "@/lib/types";

export interface IAdminBookingRow {
  id: string;
  totalAmount: number;
  status: BookingStatus;
  scheduledAt: string;
  service?: { title: string };
  customer?: { name: string; email: string };
  technician?: { user?: { name: string } };
}

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

export default function AdminBookingsTable({ bookings }: { bookings: IAdminBookingRow[] }) {
  return (
    <Card className="overflow-hidden border border-gray-200 bg-white rounded-2xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase font-bold text-gray-500 tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Booking ID</th>
              <th className="py-3.5 px-4">Service</th>
              <th className="py-3.5 px-4">Customer</th>
              <th className="py-3.5 px-4">Technician</th>
              <th className="py-3.5 px-4">Price</th>
              <th className="py-3.5 px-4">Scheduled Date</th>
              <th className="py-3.5 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400">
                  No bookings found on the platform.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/70 transition-colors text-xs">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-800 truncate max-w-[120px]">
                    {b.id}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{b.service?.title}</td>
                  <td className="py-3.5 px-4">{b.customer?.name}</td>
                  <td className="py-3.5 px-4">{b.technician?.user?.name || "Unassigned"}</td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">${b.totalAmount}</td>
                  <td className="py-3.5 px-4 text-gray-500">
                    {new Date(b.scheduledAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}