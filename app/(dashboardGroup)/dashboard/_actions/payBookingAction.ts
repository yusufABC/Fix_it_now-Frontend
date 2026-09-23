"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const payBookingAction =async(prevState:boolean,formData:FormData)=>{
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

  const res=await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`,{
        method:"POST",
           headers: {
        
 "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
            Cookie: `accessToken=${accessToken}`
        },
          body: JSON.stringify({ bookingId }),
  }) 

  const result=await res.json()
    if(result.success && result.data.url){
            redirect(result.data.url)
        }
    return result;   
  
    
}