import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
    activeUser?: {         
        id: string
        name: string
        email: string
        files: []
        diskSpace: number
        useSpace: number
    }
}

const initialState: User = {}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (
            state,
            action: PayloadAction<{ token: string, user: User["activeUser"] }>
        ) => {
            state.activeUser = action.payload.user

            localStorage.setItem('token', action.payload.token)
        },
        logOut: (state) => {
            delete state.activeUser

            localStorage.removeItem('token')
        },
    },
})

export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer
