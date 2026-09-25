"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { reviewAction } from "../_actions/reviewAction";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
   onSuccess?: () => void;
  bookingId: string;
  serviceTitle?: string;
  technicianName?: string;
}

export default function ReviewModal({
  isOpen,
  onClose,
  bookingId,
  onSuccess,
  serviceTitle,
  technicianName,
}: ReviewModalProps) {
  // State for interactive star selection
  const [selectedRating, setSelectedRating] = useState(5);

  // useActionState matching your style
  const [state, action, pending] = useActionState(reviewAction, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Review submitted successfully!");
        if (onSuccess) onSuccess();
      onClose(); // Automatically close modal on success
    } else {
      toast.error(state.message || "Failed to submit review");
    }
  }, [state, onClose,onSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl relative space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Leave a Review</h2>
          <p className="text-xs text-gray-500 mt-1">
            Rate your experience for{" "}
            <span className="font-semibold text-gray-800">
              {serviceTitle || "this service"}
            </span>{" "}
            by{" "}
            <span className="font-semibold text-gray-800">
              {technicianName || "the technician"}
            </span>
            .
          </p>
        </div>

        <form action={action} className="space-y-4">
          {/* Hidden inputs to pass bookingId and selectedRating to FormData */}
          <input type="hidden" name="bookingId" value={bookingId} />
          <input type="hidden" name="rating" value={selectedRating} />

          {/* Interactive Star Rating Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Rating (1 to 5 Stars)
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setSelectedRating(star)}
                  className={`text-3xl transition-transform hover:scale-125 focus:outline-none ${
                    star <= selectedRating ? "text-yellow-400" : "text-gray-200"
                  }`}
                >
                  ★
                </button>
              ))}
              <span className="text-xs font-bold text-gray-600 ml-2">
                {selectedRating} / 5
              </span>
            </div>
          </div>

          {/* Feedback Comment Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Your Feedback / Comment
            </label>
            <textarea
              name="comment"
              rows={4}
              required
              placeholder="Tell others about the technician's punctuality, work quality, and behavior..."
              className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={pending}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              {pending ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}