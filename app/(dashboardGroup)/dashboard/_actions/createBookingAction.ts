"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type CreateBookingState = {
  success: boolean;
  message?: string;
  data?: unknown;
} | null;

export const createBookingAction = async (
  prevState: CreateBookingState,
  formData: FormData
): Promise<CreateBookingState> => {
  const serviceId = formData.get("serviceId") as string;
  const scheduledAt = formData.get("scheduledAt") as string;
  const address = formData.get("address") as string;
  const notes = formData.get("notes") as string;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res=    await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ serviceId, scheduledAt, address, notes }),
  });
 
  // TODO: Your fetch call to POST /api/bookings
//   console.log({ serviceId, scheduledAt, address, notes });
const result=res.json()
  revalidatePath("/dashboard");
  return result
};