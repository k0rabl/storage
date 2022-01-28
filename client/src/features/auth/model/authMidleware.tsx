import { AnyAction, ThunkAction } from '@reduxjs/toolkit'

import { logIn } from './authSlice'

import { instance } from '../../../configs/axios'
import { RootState } from '../../../redux/store'

export const loginThunk =
    (
        email: string,
        password: string
    ): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        try {
            const res = await instance.post('/auth/login', {
                email,
                password,
            })

            dispatch(logIn(res.data))
        } catch (e: any) {
            console.warn('Server error: ', e.response.data.msg)
        }
    }

export const authThunk =
    (token: string): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        try {
            const res = await instance.get(`/auth/auth`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            dispatch(logIn(res.data))
        } catch (e: any) {
            localStorage.removeItem('token')
            console.warn('Server error: ', e.response.data.message)
        }
    }
