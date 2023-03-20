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
            action: PayloadAction<IActiveUser>
        ) => {
            state.activeUser = action.payload
        },
        logOut: (state) => {
            state.activeUser = {} as IActiveUser
        }
    },
})

export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer
