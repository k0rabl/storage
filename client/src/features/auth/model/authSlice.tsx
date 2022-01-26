import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface User {
  activeUser?: Object
}

const initialState: User = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn:  (state, action: PayloadAction<{token: string, user: object}>) =>{      
      state.activeUser = action.payload.user

      localStorage.setItem('token', action.payload.token)
    },
    logOut: (state) => {      
      delete state.activeUser 
      
      localStorage.removeItem('token')
    },
    registration: () => {}
  }
})



export const { 
  logIn, 
  logOut,
  registration
} = authSlice.actions

export default authSlice.reducer