import React from "react";
import { Card } from "@/components/ui/card";
import { getAdminStatus } from "../_actions/getAdminStatus";

export interface IAdminStats {
  totalUsers: number;
  totalCustomers: number;
  totalTechnicians: number;
  totalBookings: number;
  totalRevenue: number;
}

export default async function AdminStatsCards() {
    const stats=await getAdminStatus()
    // console.log(stats);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Revenue */}
      <Card className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm border-l-4 border-l-emerald-500">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Total Revenue
        </span>
        <p className="text-3xl font-black text-gray-900 mt-1">
          ${stats.totalRevenue.toLocaleString()}
        </p>
        <span className="text-xs text-emerald-600 font-medium">From Stripe Subscriptions</span>
      </Card>

      {/* 2. Total Bookings */}
      <Card className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm border-l-4 border-l-blue-500">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Total Bookings
        </span>
        <p className="text-3xl font-black text-gray-900 mt-1">{stats.totalBookings}</p>
        <span className="text-xs text-blue-600 font-medium">All Platform Jobs</span>
      </Card>

      {/* 3. Customers Count */}
      <Card className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm border-l-4 border-l-purple-500">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Customers
        </span>
        <p className="text-3xl font-black text-gray-900 mt-1">{stats.totalCustomers}</p>
        <span className="text-xs text-purple-600 font-medium">Registered Clients</span>
      </Card>

      {/* 4. Technicians Count */}
      <Card className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm border-l-4 border-l-amber-500">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Technicians
        </span>
        <p className="text-3xl font-black text-gray-900 mt-1">{stats.totalTechnicians}</p>
        <span className="text-xs text-amber-600 font-medium">Verified Professionals</span>
      </Card>
    </div>
  );
}