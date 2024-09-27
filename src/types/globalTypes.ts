
import { BaseQueryApi } from '@reduxjs/toolkit/query';
export type TError = {
    data: {
      message: string;
      stack: string;
      success: boolean;
    };
    status: number;
  };
  
  export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
  
  export type TResponse<T> = {
    data?: T;
    error?: TError ;
    meta?: TMeta;
    success: boolean;
    message: string;
  };
 
  export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

  export type  TQueryParams={
    name: string;
    value:boolean |React.Key;
  }
   export type User ={
    _id: string;
    address: string,
  email: string,
  name: string,
  password: string,
  phone: string
  role:string
  
  }
   export interface TService {
  _id: string;
  serviceId: string;
  name: string;
  date: string;
  price: number;
  duration: number;
  description: string;
}
