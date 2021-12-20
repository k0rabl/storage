import { AnyAction, ThunkAction } from '@reduxjs/toolkit'

import { logIn } from './authSlice'

import axios from 'axios'
import { RootState } from '../../redux/store'

export const loginThunk = (email: string, password: string):  
ThunkAction<void, RootState, unknown, AnyAction> => dispatch => {
  axios.get('/api/auth/login',{ 
    params: {
      email,
      password
    }
  }).then(res => {
    console.log(res)

    dispatch(logIn(res.data))
  })
}