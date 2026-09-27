import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PageProps {
  searchParams: Promise<{ bookingId?: string }>;
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const { bookingId } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 bg-white border border-gray-200 rounded-3xl shadow-xl text-center space-y-6">
        {/* Animated Success Badge */}
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
          ✓
        </div>

        {/* Headings */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-gray-900">Payment Successful!</h1>
          <p className="text-sm text-gray-500">
            Your payment has been verified and processed securely via Stripe.
          </p>
        </div>

        {/* Booking Reference Box */}
        {bookingId && (
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 text-xs text-gray-600 text-left space-y-1">
            <span className="text-gray-400 block font-medium">Booking Reference</span>
            <span className="font-mono font-bold text-gray-800 break-all">{bookingId}</span>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-xs text-blue-700 text-left space-y-1">
          <span className="font-bold block">What happens next?</span>
          <span>The technician has been notified and will arrive at your scheduled date and time.</span>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <Link href="/dashboard">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-md">
              View Appointments Dashboard →
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="outline" className="w-full border-gray-200 rounded-xl text-xs font-semibold">
              Browse More Services
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}