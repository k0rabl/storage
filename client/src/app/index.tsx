import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { authThunk } from '../features/auth/model/authMidleware'
import { Header } from '../features/header'
import { Routing } from '../pages'
import { ModalProvider } from '../features/modal/model/context'

import './app.sass'
import { Modal } from '../features/modal/ui/modal'
import { RootState } from '../redux/store'


const mapState = (state: RootState) => ({
    storage: state.storage
  })

const App: FunctionComponent<{}> = () => {
    const dispatch = useDispatch()
    const {storage: {files}} = useSelector(mapState)

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        if (token) dispatch(authThunk(token))
    }, [dispatch, files])

    return (
        <BrowserRouter>
            <ModalProvider>
                <div className="App">
                    <Header />
                    <Routing />
                    <Modal />
                </div>
            </ModalProvider>
        </BrowserRouter>
    )
}
export default App
