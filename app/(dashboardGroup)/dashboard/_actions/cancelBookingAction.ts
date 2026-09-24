"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const cencelBookingAction=async(prevState: unknown,formData:FormData)=>{
     const bookingId=formData.get("bookingId") as string;
 
          const cookieStore = await cookies();

          
     
         const accessToken = cookieStore.get("accessToken")?.value || null;
     
         if(!accessToken){
             // throw new Error("User Not Logged In!");
     
             return {
                 success : false,
                 message : "User not logged in!"
             }
         }
 
   const res=await fetch(`${process.env.BACKEND_API_URL}/api/bookings/${bookingId}/cancel`,{
         method:"PATCH",
            headers: {
         
       Authorization: `Bearer ${accessToken}`,
             Cookie: `accessToken=${accessToken}`
         },
   }) 
 
const result = await res.json();
  revalidatePath("/dashboard");
  return result;
}
