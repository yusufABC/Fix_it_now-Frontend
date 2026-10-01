'use server'
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export type UserStatusActionState = {
  success: boolean;
  message?: string;
  data?: unknown;
} | null;

export const userModerationAction=async(prevState:UserStatusActionState,formData:FormData):Promise<UserStatusActionState>=>{
     const userId = formData.get("userId");
  const status = formData.get("status");

  if(!userId || !status){
   return{
     success:false,
    message:("User ID and Status required")
   }
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

                 const res=await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}/status`,{
                    method:"PATCH",
                          headers: {
             
           Authorization: `Bearer ${accessToken}`,
                 Cookie: `accessToken=${accessToken}`,
                 "Content-Type": "application/json",
             },
             body:JSON.stringify({status})
             
                 })
                 const result=await res.json()
                   if (result.success) {
    revalidatePath("/admin-dashboard");
    revalidatePath("/services");
  }

                 return result
         
}