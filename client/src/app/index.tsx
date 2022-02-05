import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { authThunk } from '../features/auth/model/authMidleware'
import { Header } from '../features/header'
import { Routing } from '../pages'
import { ModalProvider } from '../features/modal/model/context'

import './app.sass'
import { Modal } from '../features/modal/ui'
import { RootState } from '../redux/store'


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
                    {activeUser && <Header />}
                    <Routing />
                </div>
            </ModalProvider>
        </BrowserRouter>
    )
}
export default App
