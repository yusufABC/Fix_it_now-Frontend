import React from "react";
import TechStats from "./_components/TechnicianStats";
import TechnicianBookingCard from "./_components/TechnicianBookingCard";
import CreateServiceButton from "./_components/CreateServiceButton";
import { getBookingAction } from "./_actions/getBookingAction";
import { ICategoryForTechnicianServiceCreate, ITechBookingItem } from "@/lib/types";
import { getCategoryAction } from "./_actions/getCategoryAction";
export const instant = false;
export default async function TechnicianDashboardPage() {
  // 1. Fetch real bookings from your backend
  const [bookingsRes,categoriesRes]=await Promise.all([
    getBookingAction(),
    getCategoryAction()
    ])
  // console.log(res);
 const bookings: ITechBookingItem[] = bookingsRes?.success && bookingsRes?.data ? bookingsRes.data : [];
  const categories: ICategoryForTechnicianServiceCreate[] = categoriesRes?.success && categoriesRes?.data ? categoriesRes.data : [];

  // 2. Real stats calculated from your database
  const totalJobs = bookings.length;
  const pendingRequests = bookings.filter((b) => b.status === "REQUESTED").length;
  const inProgress = bookings.filter((b) => b.status === "IN_PROGRESS").length;
  const completed = bookings.filter((b) => b.status === "COMPLETED").length;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header & Add Service Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Technician Workspace
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage incoming customer requests, update job progress, and enlist services.
            </p>
          </div>

          {/* "+ Add New Service" Button that opens the modal */}
          <CreateServiceButton categories={categories}/>
        </div>

        {/* Real Stats Grid */}
        <TechStats
          totalJobs={totalJobs}
          pendingRequests={pendingRequests}
          inProgress={inProgress}
          completed={completed}
        />

        {/* Real Booking Requests List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Job Requests & Operations</h2>
            <span className="text-xs text-gray-500 font-medium">
              Showing {bookings.length} jobs
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
              <p className="font-semibold text-gray-700">No job requests yet</p>
              <p className="text-xs text-gray-400 mt-1">
                When customers book your services, requests will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <TechnicianBookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}