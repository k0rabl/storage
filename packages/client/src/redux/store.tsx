import { configureStore } from '@reduxjs/toolkit'
import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler'
import thunk from 'redux-thunk';

import authSlice from '@features/auth/model/authSlice'
import storageSlice from '@features/storage/model/storageSlice'
import alertSlice from '@features/alert/model/alertSlice'
import loadingSlice from '@features/loading/model/loadingSlice'

import { ErrorHandler } from '@store/errorHandler';

const errorHandlerMiddleware = createThunkErrorHandlerMiddleware({ onError: ErrorHandler });

export const store = configureStore({
    reducer: {
        auth: authSlice,
        storage: storageSlice,
        alert: alertSlice, 
        loading: loadingSlice
    },
    middleware: [errorHandlerMiddleware, thunk]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
