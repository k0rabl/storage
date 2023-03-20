import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@shared/button'
import { Input } from '@shared/input'
import { registrationThunk } from '@features/auth/model/authMidleware'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/store'


interface IParams {
    email: string
    password: string
    name: string
}

export const Registration: FC<{}> = () => {
    const dispatch = useDispatch()
    const { isLoading, action } = useSelector((s: RootState) => s.loading)
    const [params, setParams] = useState<IParams>({
        email: '',
        password: '',
        name: '',
    })

    const getValues = (value: object) => {
        setParams({
            ...params,
            ...value,
        })
    }

    const handleReg = () => {
        dispatch(registrationThunk(params.email, params.name, params.password))
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
                    name="password"
                    type="password"
                    changeInput={getValues}
                    label="Password"
                />
                <Input
                    name="name"
                    type="text"
                    changeInput={getValues}
                    label="Name"
                />
            </div>

            <Button
                label="Registration"
                click={handleReg}
                classes={['login__btn']}
                isLoading={action === 'reg' && isLoading}
            />
            <div className="login__link">
                Already have an account?
                <Link to="/auth/login">Sign In</Link>
            </div>
            
        </>
    )
}
