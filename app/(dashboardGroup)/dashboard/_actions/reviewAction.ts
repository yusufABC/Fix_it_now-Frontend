'use server'

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

type ReviewActionState={
    success:boolean
    message?:string
    data?:unknown
} | null


export const reviewAction=async (prevState:ReviewActionState,formData:FormData):Promise<ReviewActionState>=>{
   const bookingId=formData.get("bookingId") 
   const rating=formData.get("rating") 
   const comment=formData.get("comment") 

        const getCookie=await cookies()
       const accessToken=getCookie.get("accessToken")?.value
       if(!accessToken){
           return {
               success:false,
               message:"User not logged"
           }
       }


   if(typeof bookingId !=="string" ||!bookingId){
    return {
        success:false,
        message:"Booking ID is required"
    }
   }
   if(!rating ){
    return{
        success:false,
        message:"Rating is required"
    }
   }
   
   const res=await fetch(`${process.env.BACKEND_API_URL}/api/reviews`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${accessToken}`,
        Cookie:`accessToken=${accessToken}`
    },
    body:JSON.stringify({
        bookingId,
        rating:Number(rating),
        comment:typeof comment ==="string" ? comment : undefined
    })    
   })

   const result=await res.json()
     if (result.success) {
    revalidatePath("/dashboard");
  }

   return result
  
    
}