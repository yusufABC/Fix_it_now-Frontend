import React from "react";
import { Card } from "@/components/ui/card";

export default function BookingsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2].map((id) => (
        <Card
          key={id}
          className="p-6 bg-white border border-gray-100 rounded-2xl animate-pulse space-y-4 shadow-sm"
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-50">
            <div className="h-5 bg-gray-200 rounded w-1/3" />
            <div className="h-6 bg-gray-200 rounded w-16" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded w-1/2" />
            <div className="h-4 bg-gray-100 rounded w-2/3" />
          </div>
        </Card>
      ))}
    </div>
  );
}