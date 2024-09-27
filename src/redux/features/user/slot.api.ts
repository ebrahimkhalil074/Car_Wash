/* eslint-disable @typescript-eslint/no-explicit-any */

import { TQueryParams, TResponseRedux } from "../../../types/globalTypes";
import { baseApi } from "../../api/api";

const slotApi =baseApi.injectEndpoints({
    endpoints: (build) => ({
        addSlot: build.mutation({
          query: (data) => ({
            url: '/slots',
           method: 'POST',
           body: data
        }),
      
        }),
        updateSlotStatus: build.mutation({
          query: (args) => ({
            url: `slots/${args.id}/status`,
            method: 'PUT',
            body: args.data,
          }),
          invalidatesTags: ['slot'],
        }),
       deleteSot: build.mutation({
          query: (id) => ({
            url: `slot/${id}`,
            method: 'DELETE',
           
          }),
          invalidatesTags: ['slot'],
        }),
        getAllSlots:build.query({
          providesTags: ['slot'],
            query: (args) => {
              console.log('args',args);
              const params = new URLSearchParams();
              if (args) {
                args.forEach((item :TQueryParams) => {
                  params.append(item.name, item.value as string);
                });
              }
               return {
              url:'/slots/availability',
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
          
        getAvailableSlots:build.query({
            query: (args) => {
              console.log('args',args);
              const params = new URLSearchParams();
              if (args) {
                args.forEach((item :TQueryParams) => {
                  params.append(item.name, item.value as string);
                });
              }
               return {
              url:'/slots/availability',
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

export const {useAddSlotMutation,useDeleteSotMutation,useGetAllSlotsQuery,useGetAvailableSlotsQuery,useUpdateSlotStatusMutation} =  slotApi   