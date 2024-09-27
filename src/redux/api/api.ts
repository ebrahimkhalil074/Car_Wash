/* eslint-disable @typescript-eslint/no-explicit-any */
// Need to use the React-specific entry point to import createApi
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

import { toast } from 'sonner';



const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);
if (result?.error?.status === 404) {
  toast.error(`somthing went worng ${result.error?.status}`)
}
if (result?.error?.status === 403) {
  toast.error(`somthing went worng ${result.error?.status}`)
}
 
  if (result?.error?.status === 401) {
    //* Send Refresh
    toast.error(`somthing went worng ${result.error?.status}`)
    console.log('Sending refresh token');

    const res = await fetch('http://localhost:5000/api/auth/refresh-token',{
      method:'POST',
      credentials:'include', 
      
  });


    const data = await res.json();
console.log(data);

    // if (data?.data?.accessToken) {
    //   const user = (api.getState() as RootState).auth.user;

    //   api.dispatch(
    //     setUser({
    //       user,
    //       token: data.data.accessToken,
    //     })
    //   );

    //   result = await baseQuery(args, api, extraOptions);
    // }
    //  else {
    //   // api.dispatch(logOut());
    // }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['service','slot','user'],
  endpoints: () => ({}),
});


