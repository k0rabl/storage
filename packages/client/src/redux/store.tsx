import { configureStore } from '@reduxjs/toolkit'
import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler'

import authSlice from '@features/auth/model/authSlice'
import storageSlice from '@features/storage/model/storageSlice'
import alertSlice from '@features/alert/model/alertSlice'

import { ErrorHandler } from '@store/errorHandler';
import thunk from 'redux-thunk';

const errorHandlerMiddleware = createThunkErrorHandlerMiddleware({ onError: ErrorHandler });

export const store = configureStore({
    reducer: {
        auth: authSlice,
        storage: storageSlice,
        alert: alertSlice
    },
    middleware: [errorHandlerMiddleware, thunk]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
