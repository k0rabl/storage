import { FC, useEffect, useState } from 'react'
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../../redux/store'
import { Button } from '../../../../shared/button'
import { Input } from '../../../../shared/input'
import { loginThunk } from '../../model/authMidleware'

import './login.sass'

interface IParams {
    email: string
    pass: string
}

const mapState = (state: RootState) => ({
    activeUser: state.auth.activeUser,
})

const Login: FC<{}> = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { activeUser } = useSelector(mapState)

    const [params, setParams] = useState<IParams>({ email: '', pass: '' })

    const getValues = (value: object) => {
        setParams({
            ...params,
            ...value,
        })
    }

    const handleLogin = () => {
        //korabl123@yandex.ru
        //qwerty123*
        dispatch(loginThunk(params.email, params.pass))
    }

    useEffect(() => {
        if (activeUser) navigate('/storage')
    }, [activeUser])

    return (
        <>
            <img className="login__img" src="/label.png" alt="" />
            <h2 className="login__title">Sign In</h2>
            <div className="login__inputs">
                <Input
                    name="email"
                    type="email"
                    changeInput={getValues}
                    label="E-Mail"
                />
                <Input
                    name="pass"
                    type="password"
                    changeInput={getValues}
                    label="Password"
                />
            </div>

            <Button
                label="Log In"
                click={handleLogin}
                classes={['login__btn']}
            />
        </>
    )
}

export default Login
