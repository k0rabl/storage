import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface File {
    _id: string
    name: string
    type: string
    path: string
    size: number
    parent?: string
    child: string[]
}

interface State {
  files: File[]
  currentFolder: string
}

const initialState: State = {
  files: [],
  currentFolder: ''
}

export const fileSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
      getFiles: (state, action: PayloadAction<[]>) => {        
        state.files = action.payload          
      },
      handleCurrFolder: (state, action: PayloadAction<string>) => {
        state.currentFolder = action.payload
      },
      deleteFile: (state, action: PayloadAction<string>) => {
        state.files = state.files.filter(el => el._id !== action.payload)
      }
    },
})

export const { getFiles, handleCurrFolder, deleteFile } = fileSlice.actions

export default fileSlice.reducer
