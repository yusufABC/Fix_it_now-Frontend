"use client";

import React, { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { changeBookingStatus } from "../_actions/changeBookingStatus";
import { BookingStatus } from "@/lib/types";

interface TechStatusButtonProps {
  bookingId: string;
  status: BookingStatus;
  label: string;
  className?: string;
  variant?: "default" | "outline";
}

export default function TechStatusButton({
  bookingId,
  status,
  label,
  className,
  variant = "default",
}: TechStatusButtonProps) {
  const [state, action, pending] = useActionState(changeBookingStatus, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || `Booking status updated to ${status}!`);
    } else {
      toast.error(state.message || "Failed to update status");
    }
  }, [state, status]);

  return (
    <form action={action}>
      <input type="hidden" name="bookingId" value={bookingId} />
      <input type="hidden" name="status" value={status} />

      <Button
        type="submit"
        size="sm"
        variant={variant}
        disabled={pending}
        className={className}
      >
        {pending ? "Updating..." : label}
      </Button>
    </form>
  );
}