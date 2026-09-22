"use server"

import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation"

type LoginState ={
success:true,
statusCode:number,
message:string,
data:{
    accessToken:string,
    refreshToken:string
}
}

type RegisterState ={
    success:true,
    statusCode:number,
    message:string,
    data:{
        name:string,
        email:string,
        role:string
    }
}
export const loginAction=async(prevState:LoginState,formData: FormData)=>{

// console.log(prevState);
const email=formData.get('email')
const password=formData.get('password')
const payload={
    email,
    password
}
// throw new Error("hi")
const res=await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(payload)
})
const result=await res.json()

if(result.success){
const cookieStore=await cookies()
cookieStore.set("accessToken",result.data.accessToken,{
    httpOnly:true,
    maxAge:60*60*24,
    sameSite:"lax"
})

cookieStore.set("refreshToken",result.data.refreshToken,{
    httpOnly:true,
    maxAge:60*60*24,
    sameSite:"lax"
})

const decodedToken=jwt.decode(result.data.accessToken) as jwt.JwtPayload
// console.log(decodedToken);
if(decodedToken.role === "CUSTOMER"){
    redirect('/dashboard')   
}else if(decodedToken.role==="TECHNICIAN"){
    redirect('/technician-dashboard')   
}else if(decodedToken.role==="ADMIN"){
    redirect('/admin-dashboard')   

}


}
if(!result.success){
    return result;

}
return result

}

export const registerAction=async(prevState:RegisterState,formData:FormData)=>{

    // console.log(prevState);
    const name=formData.get('name')
    const email=formData.get('email')
    const password=formData.get('password')
    const role=formData.get('role')

    const payload={
        name,
        email,
        password,
        role
    }

    const res=await fetch(`${process.env.BACKEND_API_URL}/api/users/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(payload)
    })

    const result=await res.json()
  
        return result
  

    // redirect("/login")

}