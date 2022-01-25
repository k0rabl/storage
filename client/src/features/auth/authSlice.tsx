import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface User {
  activeUser?: Object
}

const initialState: User = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn:  (state, action: PayloadAction<{token: string, data: object}>) =>{
      state.activeUser = action

      localStorage.setItem('token', action.payload.token)
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