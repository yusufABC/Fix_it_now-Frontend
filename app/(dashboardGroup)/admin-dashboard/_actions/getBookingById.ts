import { IAdminBooking } from "@/lib/types";
import { cookies } from "next/dist/server/request/cookies";

 export const getAdminBookingByIdAction = async (
  bookingId: string
): Promise<{ success: boolean; data: IAdminBooking | null; message?: string }> => {
  try {
    if (!bookingId) {
      return { success: false, data: null, message: "Booking ID is required!" };
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return { success: false, data: null, message: "User not logged in!" };
    }

    // Connects to GET /api/admin/bookings/:id
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/bookings/${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await res.json();
    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch booking details";
    return { success: false, data: null, message: errorMessage };
  }
};