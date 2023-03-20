import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IActiveUser {
    id: string
    name: string
    email: string
    files: []
    diskSpace: number
    usedSpace: number
}
export interface User {
    activeUser: IActiveUser
}

const initialState: User = {
    activeUser: {} as IActiveUser,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (
            state,
            action: PayloadAction<{ token: string, user: User["activeUser"] }>
        ) => {
            state.activeUser = action.payload.user
        },
        logOut: (state) => {
            state.activeUser = {} as IActiveUser

            localStorage.removeItem('token')
        }
    },
})

export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer
