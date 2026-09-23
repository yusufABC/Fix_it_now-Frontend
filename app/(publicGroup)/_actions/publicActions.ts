"use server";

export interface IServiceFilterParams {
  
  searchTerm?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  location?: string;
}

// 1. Fetch Categories for Homepage & Filters
export const getServiceAction = async () => {

    // TODO: Connect to backend: GET /api/categories or /api/categories
    /*
    
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      next: { revalidate: 3600 },
    });
    return await res.json();
    */
   const res=await fetch(`${process.env.BACKEND_API_URL}/api/services`,{
    next:{
      revalidate:60*60*24,
      tags:["categories"]
    },


    

   })
    const result= await res.json();
    return result
    
};

// 2. Fetch Filterable Services for Catalog & Featured
export const getIndividualServicesAction = async (id:string) => {

     const res=await fetch(`${process.env.BACKEND_API_URL}/api/services/${id}`,{
    next:{
      revalidate:60*60*24,
      tags:["categories"]
    },


    

   })
    const result= await res.json();
    return result
    

};