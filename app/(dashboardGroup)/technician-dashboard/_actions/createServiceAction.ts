'use server'
import { CreateServiceState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
console.log("FormData",FormData);

export const createServiceAction=async(
    prevState:CreateServiceState,
    formdata:FormData):Promise<CreateServiceState>=>{

    const title=formdata.get("title")
    const categoryId =formdata.get("categoryId")
    const price=formdata.get("price")
    const description=formdata.get("description")
    if(!title || !categoryId  || !price || !description){
        return{
            success:false,
            message:"All fields are required!"
        }
    }
    const payload={
        title,
        price:Number(price),
        categoryId ,
        description
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



                 const res=await fetch(`${process.env.BACKEND_API_URL}/api/services`,{
                    method:"POST",
                          headers: {
             
            "Content-Type": "application/json",
           Authorization: `Bearer ${accessToken}`,
                 Cookie: `accessToken=${accessToken}`
             },
             
             body:JSON.stringify(payload)
                 })
                 const result=await res.json()  

                   if (result.success) {
    // Revalidates both places so changes show immediately
    revalidatePath("/technician-dashboard");
    revalidatePath("/services");
  }

                 return result
         
}