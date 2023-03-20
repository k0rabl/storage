import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ILoading {
    isLoading: boolean
    action: string
}

const initialState: ILoading = {
    isLoading: false,
    action: ''
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoadingOn: (state, action: PayloadAction<string>) => {
            state.isLoading = true
            state.action = action.payload
        },

        setLoadingOff: () => initialState
    },
})

export const { setLoadingOn, setLoadingOff } = loadingSlice.actions

export default loadingSlice.reducer
