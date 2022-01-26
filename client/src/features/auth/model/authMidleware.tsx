import { AnyAction, ThunkAction } from '@reduxjs/toolkit'

import { logIn } from './authSlice'

import { instance } from '../../../configs/axios'
import { RootState } from '../../../redux/store'

export const loginThunk =   (email: string, password: string):  ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
  await instance.post('/auth/login',{ 
      email,
      password
  }).then(res => {
    dispatch(logIn(res.data))
  }).catch(error => console.warn('Server error: ', error.response.data.msg))
}

export const registrationThunk = (email: string, password: string, name: string):  ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
  await instance.post('/auth/registration', {
    email,
    password,
    name
  })
}