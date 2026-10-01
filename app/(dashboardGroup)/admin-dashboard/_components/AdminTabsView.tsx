"use client";

import React, { useState } from "react";
import AdminStatsCards, { IAdminStats } from "./AdminStatsCards";
import UserModerationTable, { IAdminUserItem } from "./UserModerationTable";
import CategoryManager, { IAdminCategoryItem } from "./CategoryManager";
import AdminBookingsTable from "./AdminBookingsTable";
import { IAdminBooking } from "@/lib/types";

interface AdminTabsViewProps {
  stats: IAdminStats;
  users: IAdminUserItem[];
  categories: IAdminCategoryItem[];
  bookings: IAdminBooking[];
}

export default function AdminTabsView({
  stats,
  users,
  categories,
  bookings,
}: AdminTabsViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "categories" | "bookings">(
    "overview"
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation Controls */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        {(
          [
            { key: "overview", label: "📊 Platform Overview" },
            { key: "users", label: "👥 User Moderation" },
            { key: "categories", label: "📁 Categories" },
            { key: "bookings", label: "📅 All Bookings" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.key
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <AdminStatsCards stats={stats} />
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Platform Activity</h2>
            <AdminBookingsTable bookings={bookings} />
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Manage Platform Users</h2>
          <UserModerationTable users={users} />
        </div>
      )}

      {activeTab === "categories" && (
        <CategoryManager categories={categories} />
      )}

      {activeTab === "bookings" && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">All System Bookings</h2>
          <AdminBookingsTable bookings={bookings} />
        </div>
      )}
    </div>
  );
}