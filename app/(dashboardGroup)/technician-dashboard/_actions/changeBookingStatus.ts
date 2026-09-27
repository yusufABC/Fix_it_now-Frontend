'use server'
import { BookingStatusState, CreateServiceState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
console.log("FormData",FormData);

export const changeBookingStatus=async(
    prevState:CreateServiceState,
    formdata:FormData):Promise<BookingStatusState>=>{

        const bookingId=formdata.get("bookingId") 
        const status=formdata.get("status")

  
    if(!bookingId || !status){
        return{
            success:false,
            message:"All fields are required!"
        }
    }
    const payload={
        bookingId,
        status
    }
          const cookieStore = await cookies();
             
                 const accessToken = cookieStore.get("accessToken")?.value || null;
             
                 if(!accessToken){
                     // throw new Error("User Not Logged In!");
             
                     return {
                         success : false,
                         message : "User not logged in!"
                     }
                 }




                 const res=await fetch(`${process.env.BACKEND_API_URL}/api/bookings/technician/${bookingId}/status`,{
                    method:"PATCH",
                          headers: {
             
            "Content-Type": "application/json",
           Authorization: `Bearer ${accessToken}`,
                 Cookie: `accessToken=${accessToken}`
             },
             
             body:JSON.stringify(payload)
                 })
                 const result=await res.json()  

  if (result.success) {
    revalidatePath("/technician-dashboard");
  }


                 return result
         
}