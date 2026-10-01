'use server'
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export type CreateCategoryState = {
  success: boolean;
  message?: string;
  data?: unknown;
} | null;

export const createCategoryAction=async(prevState:CreateCategoryState,formData:FormData):Promise<CreateCategoryState>=>{
     const name = formData.get("name");
  const description = formData.get("description");
  const imageUrl = formData.get("imageUrl");

  if(!name || !description){
   return{
     success:false,
    message:("Name and Description required")
   }
  }
const payload={
name,
description,
imageUrl
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

                 const res=await fetch(`${process.env.BACKEND_API_URL}/api/admin/categories`,{
                    method:"POST",
                          headers: {
             
           Authorization: `Bearer ${accessToken}`,
                 Cookie: `accessToken=${accessToken}`,
                 "Content-Type": "application/json",
             },
             body:JSON.stringify(payload)
             
                 })
                 const result=await res.json()
                   if (result.success) {
    revalidatePath("/admin-dashboard");
    revalidatePath("/services");
  }

                 return result
         
}