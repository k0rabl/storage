import { AnyAction, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit'


export interface User {
  activeUser?: Object
}

const initialState: User = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn:  (state, action: PayloadAction<Object>) =>{
      state.activeUser = action

      // localStorage.setItem('token', action)
    },
    logOut: () => {},
    registration: () => {}
  }
})



export const { 
  logIn, 
  logOut,
  registration
} = authSlice.actions

export default authSlice.reducer