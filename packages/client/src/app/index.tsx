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
import { getToken } from '@utils/tokens'


const mapState = ({ auth }: RootState) => ({
    activeUser: auth.activeUser,
  })

export const App: FC<{}> = () => {
    const dispatch = useDispatch()
    const {activeUser} = useSelector(mapState)

    useEffect(() => {
        const token = getToken()
        
        if (token)
             dispatch(authThunk(token))
    }, [dispatch])

    return (
        <BrowserRouter>
            <ModalProvider>
                <div className="App">
                    <Alert />
                    {activeUser?.id && <Header />}
                    <Routing />
                </div>
                <Modal />
            </ModalProvider>
        </BrowserRouter>
    )
}