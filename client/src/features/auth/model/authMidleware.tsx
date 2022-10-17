import { AnyAction, ThunkAction } from '@reduxjs/toolkit'
import { logIn } from './authSlice'

import { RootState } from '@store/store'
import authService from './actions'
import { AxiosError, AxiosResponse } from 'axios'

export const loginThunk = (
        email: string,
        password: string
): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        const {data}: AxiosResponse = await authService.logIn(email, password)

        dispatch(logIn(data))  
    }

export const authThunk =
    (token: string): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch) => {
            const {data}: AxiosResponse = await authService.auth(token)

            dispatch(logIn(data))
        }


