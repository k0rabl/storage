import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@shared/button'
import { Input } from '@shared/input'
import { loginThunk } from '@features/auth/model/authMidleware'

import './login.sass'
import { RootState } from '@store/store'

interface IParams {
    email: string
    pass: string
}

const Login: FC<{}> = () => {
    const dispatch = useDispatch()
    const {isLoading, action} = useSelector((s: RootState) => s.loading)
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

    return (
        <>
            <img className="login__img" src="/label.png" alt="" />
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
                isLoading={action === 'login' && isLoading}
            />
            <div className="login__link">
                Don't have an account? 
                <Link to="/auth/registration">Sign Up</Link>
            </div>
        </>
    )
}

export default Login
