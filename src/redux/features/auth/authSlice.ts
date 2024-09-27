
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export  type TUser ={
 email: string,
 name:string,
  role: string,
iat: number,
  exp: number
}
export  type TAuthState = {
  user: TUser | null,
  token: string | null  // assuming token is a string
}
const initialState: TAuthState = {
  user:null,
  token: null  
}


export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   setUser:(state,action)=>{
    const {user,token} =action.payload;
    state.user=user;
    state.token=token;

   },
   logOut: (state) => {
    state.user = null;
    state.token = null;
  }
  },
})

// Action creators are generated for each case reducer function
export const {setUser,logOut  } = counterSlice.actions

export default counterSlice.reducer

export const currentUser =(state:RootState) =>state.auth.user;
export const token = (state:RootState) => state.auth.token;