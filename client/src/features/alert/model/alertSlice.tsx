import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IAlert {
    value: string
}

const initialState: IAlert = {
    value: ''
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        addValueAlert: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },

        clearAlert: () => initialState
    },
})

export const { addValueAlert, clearAlert } = alertSlice.actions

export default alertSlice.reducer
