/* eslint-disable @typescript-eslint/no-explicit-any */

import { TQueryParams, TResponseRedux } from "../../../types/globalTypes";
import { baseApi } from "../../api/api";

const bookingApi =baseApi.injectEndpoints({
    endpoints: (build) => ({
        addService: build.mutation({
          query: (data) => ({
            url: 'services/create-services',
           method: 'POST',
           body: data
        }),
      
        }),
       
          
        getMyBookings:build.query({
            query: (args) => {
              console.log('args',args);
              const params = new URLSearchParams();
              if (args) {
                args.forEach((item :TQueryParams) => {
                  params.append(item.name, item.value as string);
                });
              }
               return {
              url:'bookings/my-bookings',
              method: 'GET',
              params: params,
            }},
            transformResponse: (response :TResponseRedux<any> ) => {
              console.log('insaide api',response);
              
              return{
               data: response.data,
               meta: response.meta
                
              }
               
            },

           
            // add other response transformations here
          
           
          }),
    
      

        //
    }),
})

export const {useGetMyBookingsQuery} =  bookingApi   