import React from "react";
import BookingCard from "./_components/bookingCard";
import { Card } from "@/components/ui/card";
import { IBooking } from "@/lib/types";
// import { getMyBookingsAction } from "./_actions/bookingAction";

// Static mock items directly matching your real backend response
const STATIC_CUSTOMER_BOOKINGS: IBooking[] = [
  {
    id: "1bda2820-7d64-443e-aab6-68fea4bdffc2",
    customerId: "f78bb5c5-b55e-4b06-909e-d1650e542616",
    technicianId: "66388d73-55e6-4f11-a039-a80be3bdb8e9",
    serviceId: "ba651c4f-630b-461c-89a0-62b79d591a10",
    address: "House 3, Road 5, Chattogram, Sitakund",
    notes: "Bathroom tap is constantly leaking.",
    scheduledAt: "2026-09-01T10:00:00.000Z",
    status: "COMPLETED",
    totalAmount: 80,
    createdAt: "2026-08-27T11:38:56.200Z",
    updatedAt: "2026-08-27T17:46:26.468Z",
    service: {
      id: "ba651c4f-630b-461c-89a0-62b79d591a10",
      technicianId: "66388d73-55e6-4f11-a039-a80be3bdb8e9",
      categoryId: "d862a50e-63ce-4c2f-8949-418e4584936c",
      title: "Emergency Septic Tank Repair",
      description: "Fast fix for septic pipes,Sinks, and bathroom leakages.",
      price: 80,
      createdAt: "2026-08-27T11:36:31.664Z",
      updatedAt: "2026-08-27T11:36:31.664Z",
    },
    technician: {
      id: "66388d73-55e6-4f11-a039-a80be3bdb8e9",
      userId: "9f4e229a-3318-4b29-afb1-5057e81d6334",
      skills: ["Pipe Fitting", "Bathroom Plumbing", "Leak Repair"],
      yearOfExperience: 7,
      location: "Gulshan 5, Dhaka",
      averageRating: 5,
      totalReviews: 2,
      createdAt: "2026-08-22T06:16:44.628Z",
      updatedAt: "2026-09-06T20:16:50.087Z",
      user: {
        id: "9f4e229a-3318-4b29-afb1-5057e81d6334",
        name: "Alex Smith",
        email: "test4@gmail.com",
      },
    },
  },
  {
    id: "3758a4dd-7f9a-4cb9-9b73-534a38708930",
    customerId: "f78bb5c5-b55e-4b06-909e-d1650e542616",
    technicianId: "66388d73-55e6-4f11-a039-a80be3bdb8e9",
    serviceId: "ae4a99e8-8b39-413f-a3df-fa9bfc638fb9",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    notes: "One of the wooden cabinet doors is damaged and needs repair.",
    scheduledAt: "2026-09-10T10:00:00.000Z",
    status: "ACCEPTED", // 👈 Shows "Pay with Stripe" button!
    totalAmount: 50,
    createdAt: "2026-09-06T19:47:10.238Z",
    updatedAt: "2026-09-06T20:22:46.866Z",
    service: {
      id: "ae4a99e8-8b39-413f-a3df-fa9bfc638fb9",
      technicianId: "66388d73-55e6-4f11-a039-a80be3bdb8e9",
      categoryId: "5e2eebf6-dce7-4ac4-aadf-405d20f7edbe",
      title: "Furniture Repair & Custom Carpentry",
      description: "Professional furniture repairs, custom woodwork, and door and cabinet installation.",
      price: 50,
      createdAt: "2026-09-06T19:42:50.791Z",
      updatedAt: "2026-09-06T19:42:50.791Z",
    },
    technician: {
      id: "66388d73-55e6-4f11-a039-a80be3bdb8e9",
      userId: "9f4e229a-3318-4b29-afb1-5057e81d6334",
      skills: ["Door Repair", "Furniture Making"],
      yearOfExperience: 7,
      location: "Gulshan 5, Dhaka",
      averageRating: 5,
      totalReviews: 2,
      createdAt: "2026-08-22T06:16:44.628Z",
      updatedAt: "2026-09-06T20:16:50.087Z",
      user: {
        id: "9f4e229a-3318-4b29-afb1-5057e81d6334",
        name: "Alex Smith",
        email: "test4@gmail.com",
      },
    },
  },
];

export default async function CustomerDashboardPage() {
  // 💡 When you want real backend data, just uncomment:
  // const res = await getMyBookingsAction();
  // const bookings: IBooking[] = res.success && res.data.length > 0 ? res.data : STATIC_CUSTOMER_BOOKINGS;

  const bookings: IBooking[] = STATIC_CUSTOMER_BOOKINGS;

  // Stats calculation
  const totalBookings = bookings.length;
  const pendingPayment = bookings.filter((b) => b.status === "ACCEPTED").length;
  const completed = bookings.filter((b) => b.status === "COMPLETED").length;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">My Appointments</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track your service requests, complete payments, and manage booking history.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase">Total Bookings</span>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalBookings}</p>
          </Card>
          <Card className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
            <span className="text-xs font-semibold text-purple-600 uppercase">Awaiting Payment</span>
            <p className="text-2xl font-bold text-purple-700 mt-1">{pendingPayment}</p>
          </Card>
          <Card className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
            <span className="text-xs font-semibold text-emerald-600 uppercase">Completed</span>
            <p className="text-2xl font-bold text-emerald-700 mt-1">{completed}</p>
          </Card>
        </div>

        {/* Bookings Feed */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Booking History</h2>

          {bookings.length === 0 ? (
            <Card className="p-12 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
              <p className="font-semibold text-gray-700">No bookings found</p>
              <p className="text-xs text-gray-400 mt-1">
                You haven&apos;t booked any services yet.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}