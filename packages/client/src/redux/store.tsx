import { configureStore } from '@reduxjs/toolkit'

import authSlice from '@features/auth/model/authSlice'
import storageSlice from '@features/storage/model/storageSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        storage: storageSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
