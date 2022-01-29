import { AnyAction, ThunkAction } from '@reduxjs/toolkit'

import { getFiles } from './storageSlice'

import { instance } from '../../../configs/axios'
import { RootState } from '../../../redux/store'

export const getFilesThunk = (): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
  try {
    const res = await instance.get(`/file/get`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    dispatch(getFiles(res.data))
  } catch (e: any) {
      console.warn('Server error: ', e.response.data.message)
  }
}