import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { authThunk } from '../features/auth/model/authMidleware'
import { Header } from '../features/header'
import { Routing } from '../pages'

import './app.sass'

const App: FunctionComponent<{}> = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) dispatch(authThunk(token))
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routing />
            </div>
        </BrowserRouter>
    )
}
export default App
