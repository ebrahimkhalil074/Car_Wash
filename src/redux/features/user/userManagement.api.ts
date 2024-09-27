/* eslint-disable @typescript-eslint/no-explicit-any */


import { TQueryParams, TResponseRedux } from "../../../types/globalTypes";
import { baseApi } from "../../api/api";

const userManagementApi =baseApi.injectEndpoints({
    endpoints: (build) => ({
        addUser: build.mutation({
          query: (data) => ({
            url: '/auth/signup',
           method: 'POST',
           body: data
        }),
        }),
        loginUser: build.mutation({
          query: (data) => ({
            url: '/auth/login',
           method: 'POST',
           body: data
        }),
        }),
        
      
       
        changePassword: build.mutation({
          query: (data) =>{
            return ({
              url: `auth/change-password`,
             method:'POST',
             body:data
          })
          },
          invalidatesTags: ['user'],
      }),
        getAllUser:build.query({
          providesTags: ['user'],

            query: (args) => {
              console.log('args',args);
              const params = new URLSearchParams();
              if (args) {
                args.forEach((item :TQueryParams) => {
                  params.append(item.name, item.value as string);
                });
                
              }
               return {
              url:'/auth/users',
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
          updateUserRole: build.mutation({
            query: (args) => ({
              url: `auth/users/${args.id}/role`,
              method: 'PUT',
              body:args.data,
            }),
            invalidatesTags: ['user'],
          }),
          updateUser: build.mutation({
            query: (args) => ({
              url: `auth/users/${args.id}/user`,
              method: 'PUT',
              body:args.data,
            }),
            invalidatesTags: ['user'],
          }),
        getSingleUser:build.query({
            query: (studentId) => {
              console.log('args',studentId);
              // const params = new URLSearchParams();
              // if (args) {
              //   args.forEach((item :TQueryParams) => {
              //     params.append(item.name, item.value as string);
              //   });
              // }
               return {
              url:`students/${studentId}`,
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
      
        //
    }),
})

export const {useAddUserMutation,useLoginUserMutation,useGetAllUserQuery,useGetSingleUserQuery,useChangePasswordMutation,useUpdateUserRoleMutation,useUpdateUserMutation} = userManagementApi