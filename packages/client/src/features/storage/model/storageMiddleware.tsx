import { AnyAction, ThunkAction } from '@reduxjs/toolkit'

import { getFiles } from './storageSlice'

import { RootState } from '@store/store'
import { getFilesService } from './actions'

export const getFilesThunk = (): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
  try {
    const res = await getFilesService()

    const sortedFiles = res.data.sort((a: File, b: File) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()

      if (b.type === 'dir') return 1
      if (a.type === 'dir') return -1 
      
      if (nameA < nameB) return -1
      if (nameA > nameB) return 1

      return 0
    })
    
    dispatch(getFiles(sortedFiles))
  } catch (e: any) {
      console.warn('Server error: ', e.response.data.message)
  }
}