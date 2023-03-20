import { AnyAction, ThunkAction } from '@reduxjs/toolkit'
import { logIn } from './authSlice'

import { RootState } from '@store/store'
import authService from './actions'
import { AxiosResponse } from 'axios'
import { removeToken, updateToken } from '@utils/tokens'
import { setLoadingOff, setLoadingOn } from '@features/loading/model/loadingSlice'

export const registrationThunk =
    (
        email: string,
        password: string,
        name: string
    ): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch) => {
            dispatch(setLoadingOn('reg'))

            const { data } = await authService.registration(email, password, name)

            updateToken(data.token)
               
            dispatch(logIn(data))  
            dispatch(setLoadingOff())
        } 

export const loginThunk = (
        email: string,
        password: string
): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        dispatch(setLoadingOn('login'))
        
        const {data}: AxiosResponse = await authService.logIn(email, password)

        updateToken(data.token)

        dispatch(logIn(data))  
        dispatch(setLoadingOff())
    }

export const authThunk =
    (token: string): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch) => {
            try {
                const {data} = await authService.auth(token)

                updateToken(data.token)
                dispatch(logIn(data.user))

            } catch (e) {                
                removeToken()
            }
        }