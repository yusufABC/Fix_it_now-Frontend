"use client";

import React, { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { userModerationAction } from "../_actions/userModerationAction";

interface BanUserButtonProps {
  userId: string;
  currentStatus: "ACTIVE" | "BANNED";
}

export default function BanUserButton({ userId, currentStatus }: BanUserButtonProps) {
  // 1. Hook into your Server Action
  const [state, action, pending] = useActionState(userModerationAction, null);

  // 2. Determine what status to send next
  const isBanned = currentStatus === "BANNED";
  const nextStatus = isBanned ? "ACTIVE" : "BANNED";

  // 3. Trigger toast on success or error
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(
        state.message || (isBanned ? "User unbanned successfully!" : "User banned successfully!")
      );
    } else {
      toast.error(state.message || "Failed to update user status");
    }
  }, [state, isBanned]);

  return (
    <form action={action} className="inline-block">
      {/* Hidden inputs sent to FormData */}
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="status" value={nextStatus} />

      <Button
        type="submit"
        size="sm"
        disabled={pending}
        variant={isBanned ? "outline" : "destructive"}
        className={
          isBanned
            ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold"
            : "text-xs font-semibold"
        }
      >
        {pending
          ? "Updating..."
          : isBanned
          ? "Unban User"
          : "Ban User"}
      </Button>
    </form>
  );
}