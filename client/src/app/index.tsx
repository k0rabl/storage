import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { authThunk } from '@features/auth/model/authMidleware'
import { Header } from '@features/header'
import { ModalProvider } from '@features/modal/model/context'
import { Modal } from '@features/modal/ui'

import { RootState } from '@store/store'

import { Routing } from '@pages'

import './app.sass'
import Alert from '@features/alert/ui'


const mapState = (state: RootState) => ({
    activeUser: state.auth.activeUser,
    storage: state.storage
  })

const App: FC<{}> = () => {
    const dispatch = useDispatch()
    const {activeUser, storage: {files}} = useSelector(mapState)

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        if (token) dispatch(authThunk(token))
    }, [dispatch, files])

    return (
        <BrowserRouter>
            <ModalProvider>
                <div className="App">
                    <Alert />
                    {activeUser && <Header />}
                    <Routing />
                </div>
                <Modal />
            </ModalProvider>
        </BrowserRouter>
    )
}
export default App
