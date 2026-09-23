"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  preselectedServiceId,
}: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const scheduledAt = formData.get("scheduledAt");
    const address = formData.get("address");
    const notes = formData.get("notes");

    console.log("Booking submitted:", {
      serviceId: preselectedServiceId,
      scheduledAt,
      address,
      notes,
    });

    // Simulated success for now (later connect to your server action)
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Booking request sent successfully!");
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-lg p-6 bg-white shadow-2xl rounded-2xl relative">
        <h2 className="text-xl font-bold text-gray-900">Book Appointment</h2>
        <p className="text-sm text-gray-500 mt-1">
          Select your preferred time slot and enter your location details.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <input
            type="hidden"
            name="serviceId"
            value={preselectedServiceId || ""}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time
            </label>
            <Input type="datetime-local" name="scheduledAt" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Address
            </label>
            <Input
              type="text"
              name="address"
              required
              placeholder="House, Road, Area, Dhaka"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Problem Description / Notes
            </label>
            <textarea
              name="notes"
              rows={3}
              placeholder="Any details the technician should know..."
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Requesting..." : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}