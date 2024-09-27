/* eslint-disable @typescript-eslint/no-explicit-any */


import { TQueryParams, TResponseRedux } from "../../../types/globalTypes";
import { baseApi } from "../../api/api";

const servicesApi =baseApi.injectEndpoints({
    endpoints: (build) => ({
        addService: build.mutation({
          query: (data) => ({
            url: 'services/create-services',
           method: 'POST',
           body: data
        }),
      
        }),
        updateService: build.mutation({
          query: (args) => ({
            url: `services/${args.id}`,
            method: 'PUT',
            body: args.data,
          }),
          invalidatesTags: ['service'],
        }),
       deleteService: build.mutation({
          query: (id) => ({
            url: `services/${id}`,
            method: 'DELETE',
           
          }),
          invalidatesTags: ['service'],
        }),
        getAllServices:build.query({
          providesTags: ['service'],
            query: (args) => {
              console.log('args',args);
              const params = new URLSearchParams();
              if (args) {
                args.forEach((item :TQueryParams) => {
                  params.append(item.name, item.value as string);
                });
              }
               return {
              url:'/services',
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
          getSingleService:build.query({
            query: (serviceId) => {
              console.log('args',serviceId);
              // const params = new URLSearchParams();
              // if (args) {
              //   args.forEach((item :TQueryParams) => {
              //     params.append(item.name, item.value as string);
              //   });
              // }
               return {
              url:`services/${serviceId}`,
              method: 'GET',
              // params: params,
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

export const {useAddServiceMutation,useGetAllServicesQuery,useGetAvailableSlotsQuery,useUpdateServiceMutation,useDeleteServiceMutation,useGetSingleServiceQuery} =  servicesApi   