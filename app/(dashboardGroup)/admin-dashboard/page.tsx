"use client";

import React, { useState } from "react";
import AdminStatsCards, { IAdminStats } from "./_components/AdminStatsCards";
import UserModerationTable, { IAdminUserItem } from "./_components/UserModerationTable";
import CategoryManager, { IAdminCategoryItem } from "./_components/CategoryManager";
import AdminBookingsTable, { IAdminBookingRow } from "./_components/AdminBookingsTable";

// Static mock data for preview (replace with your server action responses)
const STATIC_STATS: IAdminStats = {
  totalRevenue: 3450,
  totalBookings: 28,
  totalCustomers: 18,
  totalTechnicians: 7,
};

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
  {
    id: "usr-3",
    name: "Spam Account",
    email: "bot@fake.com",
    role: "CUSTOMER",
    status: "BANNED",
    createdAt: "2026-09-01T12:00:00.000Z",
  },
];

const STATIC_CATEGORIES: IAdminCategoryItem[] = [
  { id: "cat-1", name: "Plumbing", description: "Pipe fixes, water leakages, sink setup", _count: { services: 6 } },
  { id: "cat-2", name: "Electrical", description: "Wiring, circuit breakers, fan installation", _count: { services: 9 } },
  { id: "cat-3", name: "Cleaning", description: "Deep house cleaning, sofa sanitization", _count: { services: 4 } },
];

const STATIC_BOOKINGS: IAdminBookingRow[] = [
  {
    id: "book-101",
    totalAmount: 80,
    status: "COMPLETED",
    scheduledAt: "2026-09-20T10:00:00.000Z",
    service: { title: "Emergency Pipe Leak Repair" },
    customer: { name: "John Doe", email: "customer@example.com" },
    technician: { user: { name: "Alex Smith" } },
  },
  {
    id: "book-102",
    totalAmount: 45,
    status: "PAID",
    scheduledAt: "2026-09-28T14:30:00.000Z",
    service: { title: "Ceiling Fan Installation" },
    customer: { name: "Rahim Ahmed", email: "rahim@example.com" },
    technician: { user: { name: "Karim Electrical" } },
  },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "categories" | "bookings">(
    "overview"
  );

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
            <AdminStatsCards />
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Platform Activity</h2>
              <AdminBookingsTable bookings={STATIC_BOOKINGS} />
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Manage Platform Users</h2>
            <UserModerationTable users={STATIC_USERS} />
          </div>
        )}

        {activeTab === "categories" && (
          <CategoryManager categories={STATIC_CATEGORIES} />
        )}

        {activeTab === "bookings" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">All System Bookings</h2>
            <AdminBookingsTable bookings={STATIC_BOOKINGS} />
          </div>
        )}
      </div>
    </div>
  );
}