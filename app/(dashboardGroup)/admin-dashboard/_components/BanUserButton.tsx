"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface BanUserButtonProps {
  userId: string;
  currentStatus: "ACTIVE" | "BANNED";
}

export default function BanUserButton({ userId, currentStatus }: BanUserButtonProps) {
  const isBanned = currentStatus === "BANNED";
  const newStatus = isBanned ? "ACTIVE" : "BANNED";

  return (
    /* Plug your server action into action="" */
    <form action="" className="inline-block">
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="status" value={newStatus} />

      <Button
        type="submit"
        size="sm"
        variant={isBanned ? "outline" : "destructive"}
        className={
          isBanned
            ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold"
            : "text-xs font-semibold"
        }
      >
        {isBanned ? "Unban User" : "Ban User"}
      </Button>
    </form>
  );
}