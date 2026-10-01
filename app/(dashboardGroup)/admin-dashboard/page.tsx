import React from "react";
import AdminTabsView from "./_components/AdminTabsView";
import { getAdminStatus } from "./_actions/getAdminStatus";
import { IAdminStats } from "./_components/AdminStatsCards";
import { IAdminUserItem } from "./_components/UserModerationTable";
import { IAdminCategoryItem } from "./_components/CategoryManager";
// import { IAdminBookingRow } from "./_components/AdminBookingsTable";
import { getCategoryAction } from "../technician-dashboard/_actions/getCategoryAction";
import { IAdminBooking, IAdminCategory, IUser } from "@/lib/types";
import { getAllBookingAction } from "./_actions/getAllBookingAction";
import { getAllUsersAction } from "./_actions/getAllUsersAction";

// Next.js 16 setting for server-side runtime routes
export const instant = false;

// Mock data fallbacks for tables until you plug in your actions
const STATIC_USERS: IAdminUserItem[] = [
  {
    id: "usr-1",
    name: "Alex Smith",
    email: "alex.tech@example.com",
    role: "TECHNICIAN",
    status: "ACTIVE",
    createdAt: "2026-08-22T06:16:44.628Z",
  },
  {
    id: "usr-2",
    name: "John Doe",
    email: "customer@example.com",
    role: "CUSTOMER",
    status: "ACTIVE",
    createdAt: "2026-08-25T10:00:00.000Z",
  },
];

// const STATIC_CATEGORIES: IAdminCategoryItem[] = [
//   { id: "cat-1", name: "Plumbing", description: "Pipe fixes, water leakages", _count: { services: 6 } },
//   { id: "cat-2", name: "Electrical", description: "Wiring, circuit breakers", _count: { services: 9 } },
//   { id: "cat-3", name: "Cleaning", description: "Deep house cleaning", _count: { services: 4 } },
// ];

// const STATIC_BOOKINGS: IAdminBookingRow[] = [
//   {
//     id: "book-101",
//     totalAmount: 80,
//     status: "COMPLETED",
//     scheduledAt: "2026-09-20T10:00:00.000Z",
//     service: { title: "Emergency Pipe Leak Repair" },
//     customer: { name: "John Doe", email: "customer@example.com" },
//     technician: { user: { name: "Alex Smith" } },
//   },
// ];

export default async function AdminDashboardPage() {
  // 1. Fetch real stats on the server directly from your backend
  const [statusRes,categoryRes,bookingRes,userRes] = await Promise.all([
    getAdminStatus(),
    getCategoryAction(),
    getAllBookingAction(),
    getAllUsersAction()
  ])
  
  const stats: IAdminStats = statusRes?.success && statusRes?.data ? statusRes.data : {
    totalRevenue: 0,
    totalBookings: 0,
    totalCustomers: 0,
    totalTechnicians: 0,
  };

  

  const category:IAdminCategory[]=categoryRes?.success && categoryRes?.data ? categoryRes.data : [];
  const booking:IAdminBooking[]=bookingRes?.success && bookingRes?.data ? bookingRes.data : [];
  const users:IUser[]=userRes?.success && userRes?.data ? userRes.data : [];

  // console.log(stats);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Portal</h1>
          <p className="text-sm text-gray-500 mt-1">
            Platform governance, user moderation, category management, and booking oversight.
          </p>
        </div>

        {/* 2. Pass server-fetched data to the client tabs view */}
        <AdminTabsView
          stats={stats}
          users={users}
          categories={category}
          bookings={booking}
        />


      </div>
    </div>
  );
}