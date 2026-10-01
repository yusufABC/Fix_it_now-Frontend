import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAdminBookingByIdAction } from "../../_actions/getBookingById";
import { BookingStatus, IAdminBooking } from "@/lib/types";

export const instant = false;

interface PageProps {
  params: Promise<{ id: string }>;
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
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
}

export default async function AdminBookingDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const res = await getAdminBookingByIdAction(id);

  if (!res.success || !res.data) {
    notFound();
  }

  const booking: IAdminBooking = res.data;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/admin-dashboard" className="hover:text-blue-600 transition">
              Admin Portal
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Booking Details</span>
          </div>

          <Link href="/admin-dashboard">
            <Button variant="outline" size="sm" className="rounded-xl">
              ← Back to Portal
            </Button>
          </Link>
        </div>

        {/* Header Bar */}
        <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-gray-900">
                {booking.service?.title}
              </h1>
              <StatusBadge status={booking.status} />
            </div>
            <p className="text-xs font-mono text-gray-400 mt-1">ID: {booking.id}</p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-3xl font-black text-emerald-600">
              ${booking.totalAmount}
            </span>
            <span className="text-xs text-gray-400 block font-medium">Service Fee</span>
          </div>
        </Card>

        {/* 2-Column Grid for All Relations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Customer Information */}
          <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <span>👤</span> Customer Information
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="font-semibold text-gray-800">{booking.customer?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="font-mono text-gray-800">{booking.customer?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Scheduled:</span>
                <span className="font-medium text-gray-800">
                  {new Date(booking.scheduledAt).toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-50">
                <span className="text-gray-400 block text-xs mb-1">Service Address:</span>
                <p className="text-gray-800 font-medium bg-gray-50 p-2.5 rounded-lg border border-gray-100 text-xs">
                  {booking.address}
                </p>
              </div>
              {booking.notes && (
                <div>
                  <span className="text-gray-400 block text-xs mb-1">Customer Notes:</span>
                  <p className="text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-100 text-xs">
                    {booking.notes}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* 2. Technician Information */}
          <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <span>🛠️</span> Assigned Technician
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span className="text-gray-400">Technician:</span>
                <span className="font-semibold text-gray-800">
                  {booking.technician?.user?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="font-mono text-gray-800">
                  {booking.technician?.user?.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Location:</span>
                <span className="font-medium text-gray-800">
                  📍 {booking.technician?.location}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Experience:</span>
                <span className="font-medium text-gray-800">
                  {booking.technician?.yearOfExperience} Years
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Rating:</span>
                <span className="font-bold text-yellow-500">
                  ★ {booking.technician?.averageRating} ({booking.technician?.totalReviews} reviews)
                </span>
              </div>

              {booking.technician?.skills?.length > 0 && (
                <div className="pt-2 border-t border-gray-50">
                  <span className="text-gray-400 block text-xs mb-1.5">Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {booking.technician.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[11px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* 3. Stripe Payment Audit */}
          <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <span>💳</span> Stripe Payment Transaction
            </h2>
            {booking.subscription ? (
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="font-semibold text-emerald-600">
                    {booking.subscription.subscriptionStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount Paid:</span>
                  <span className="font-bold text-gray-900">${booking.subscription.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Transaction ID:</span>
                  <span className="font-mono text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200">
                    {booking.subscription.transactionId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Stripe Customer:</span>
                  <span className="font-mono text-xs text-gray-600 truncate max-w-[200px]">
                    {booking.subscription.stripeCustomerId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Paid Date:</span>
                  <span className="text-gray-800 text-xs">
                    {new Date(booking.subscription.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic py-4 text-center">
                No payment transaction recorded for this booking yet.
              </p>
            )}
          </Card>

          {/* 4. Customer Review */}
          <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <span>⭐</span> Customer Review
            </h2>
            {booking.review ? (
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-1 text-yellow-400 text-base">
                  {"★".repeat(booking.review.rating || 5)}
                  <span className="text-xs font-bold text-gray-800 ml-2">
                    {booking.review.rating} / 5
                  </span>
                </div>
                <p className="text-xs text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 leading-relaxed italic">
                  &ldquo;{booking.review.comment || "No written feedback provided."}&rdquo;
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic py-4 text-center">
                Customer has not submitted a review for this booking yet.
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}