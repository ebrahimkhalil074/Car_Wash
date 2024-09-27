/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/api";



const authApi =baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login:builder.mutation({
            query: (userInfo :any) => { 
               return {
              url:'/auth/login',
              method: 'POST',
              body:userInfo,
            }}
           
          })
   
  }),
})


export const { useLoginMutation}  = authApi;