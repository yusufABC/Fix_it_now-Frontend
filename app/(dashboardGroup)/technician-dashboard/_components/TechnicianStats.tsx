import React from "react";
import { Card } from "@/components/ui/card";

interface TechStatsProps {
  totalJobs: number;
  pendingRequests: number;
  inProgress: number;
  completed: number;
}

export default function TechnicianStats({
  totalJobs,
  pendingRequests,
  inProgress,
  completed,
}: TechStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <Card className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
        <span className="text-xs font-semibold text-gray-400 uppercase">Total Requests</span>
        <p className="text-2xl font-bold text-gray-900 mt-1">{totalJobs}</p>
      </Card>

      <Card className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
        <span className="text-xs font-semibold text-amber-600 uppercase">Pending Decision</span>
        <p className="text-2xl font-bold text-amber-700 mt-1">{pendingRequests}</p>
      </Card>

      <Card className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
        <span className="text-xs font-semibold text-indigo-600 uppercase">Active / In-Progress</span>
        <p className="text-2xl font-bold text-indigo-700 mt-1">{inProgress}</p>
      </Card>

      <Card className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
        <span className="text-xs font-semibold text-emerald-600 uppercase">Completed</span>
        <p className="text-2xl font-bold text-emerald-700 mt-1">{completed}</p>
      </Card>
    </div>
  );
}