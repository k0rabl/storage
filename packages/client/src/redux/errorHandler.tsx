import { addValueAlert } from "@features/alert/model/alertSlice"
import { setLoadingOff } from "@features/loading/model/loadingSlice"
import { AxiosError } from "axios"
import { store } from "./store"

export const ErrorHandler = (err: AxiosError) => {    
    let errMsg = 'Something went wrong...'

    if (err.message === 'Network Error') { 
        errMsg = 'Check your internet connection'
    }

    if (err.response?.data.msg) {
        errMsg = err.response?.data.msg
    }

    store.dispatch(setLoadingOff())
    store.dispatch(addValueAlert(errMsg))
  }