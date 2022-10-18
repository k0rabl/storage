import { addValueAlert } from "@features/alert/model/alertSlice";
import { AxiosError } from "axios";
import { store } from "./store";

export const ErrorHandler = (err: AxiosError) => {     
    let errMsg = 'Something went wrong...'

    if (err.message === 'Network Error') { 
        errMsg = 'Check your internet connection'
    }

    if (err.response?.data.msg) {
        errMsg = err.response?.data.msg
    }
    
    store.dispatch(addValueAlert(errMsg))
  }