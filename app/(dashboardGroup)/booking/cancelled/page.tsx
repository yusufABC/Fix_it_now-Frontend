import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PaymentCancelledPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 bg-white border border-gray-200 rounded-3xl shadow-xl text-center space-y-6">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
          !
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-gray-900">Payment Cancelled</h1>
          <p className="text-sm text-gray-500">
            You were not charged. Your booking is still preserved, and you can retry paying whenever you are ready.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/dashboard">
            <Button className="w-full bg-gray-900 hover:bg-black text-white font-bold py-2.5 rounded-xl">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}