"use server"


export const getNewAccessToken = async (refreshToken :string) => {


    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers : {
            Cookie : `refreshToken=${refreshToken}`
        },
        cache : "no-cache",
    });

    const result = await res.json();


    return result
}