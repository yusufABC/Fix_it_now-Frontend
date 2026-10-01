import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingStatus, IAdminBooking } from "@/lib/types";

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

export default function AdminBookingsTable({ bookings }: { bookings: IAdminBooking[] }) {
  return (
    <Card className="overflow-hidden border border-gray-200 bg-white rounded-2xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase font-bold text-gray-500 tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Booking Ref</th>
              <th className="py-3.5 px-4">Service & Price</th>
              <th className="py-3.5 px-4">Customer</th>
              <th className="py-3.5 px-4">Technician</th>
              <th className="py-3.5 px-4">Schedule & Location</th>
              <th className="py-3.5 px-4">Stripe Payment</th>
              <th className="py-3.5 px-4">Status</th>
              {/* 👈 1. Added Action header */}
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-gray-400">
                  No bookings found on the platform.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/70 transition-colors text-xs">
                  {/* 1. Booking ID (Clickable) */}
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-800">
                    <Link
                      href={`/admin-dashboard/bookings/${b.id}`}
                      className="hover:text-blue-600 hover:underline"
                      title={b.id}
                    >
                      #{b.id.slice(0, 8)}...
                    </Link>
                  </td>

                  {/* 2. Service & Total Amount */}
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-gray-900 line-clamp-1">{b.service?.title}</p>
                    <p className="text-emerald-600 font-extrabold text-sm mt-0.5">${b.totalAmount}</p>
                  </td>

                  {/* 3. Customer */}
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-gray-900">{b.customer?.name}</p>
                    <p className="text-gray-400 text-[11px] truncate max-w-[140px]">{b.customer?.email}</p>
                  </td>

                  {/* 4. Technician */}
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-gray-900">
                      {b.technician?.user?.name || "Unassigned"}
                    </p>
                    <p className="text-gray-400 text-[11px]">{b.technician?.location || "N/A"}</p>
                  </td>

                  {/* 5. Scheduled Date & Address */}
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-gray-800">
                      {new Date(b.scheduledAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-400 text-[11px] line-clamp-1 max-w-[150px]" title={b.address}>
                      {b.address}
                    </p>
                  </td>

                  {/* 6. Stripe Transaction ID */}
                  <td className="py-3.5 px-4">
                    {b.subscription?.transactionId ? (
                      <span
                        className="font-mono text-[11px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded block truncate max-w-[110px]"
                        title={b.subscription.transactionId}
                      >
                        {b.subscription.transactionId}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[11px] italic">No transaction</span>
                    )}
                  </td>

                  {/* 7. Status Badge */}
                  <td className="py-3.5 px-4">
                    <StatusBadge status={b.status} />
                  </td>

                  {/* 8. 👈 The Link Button taking you to /admin-dashboard/bookings/[id] */}
                  <td className="py-3.5 px-4 text-right">
                    <Link href={`/admin-dashboard/bookings/${b.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs font-semibold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                      >
                        View Details →
                      </Button>
                    </Link>
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