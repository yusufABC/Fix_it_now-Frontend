'use server'
import { cookies } from "next/headers";

export const getAdminStatus=async()=>{
           const cookieStore = await cookies();
        
                  
             
                 const accessToken = cookieStore.get("accessToken")?.value || null;
             
                 if(!accessToken){
                     // throw new Error("User Not Logged In!");
             
                     return {
                         success : false,
                         message : "User not logged in!"
                     }
                 }

                 const res=await fetch(`${process.env.BACKEND_API_URL}/api/admin/stats`,{
                          headers: {
             
           Authorization: `Bearer ${accessToken}`,
                 Cookie: `accessToken=${accessToken}`
             },
                 })
                 const result=await res.json()

                 return result
         
}