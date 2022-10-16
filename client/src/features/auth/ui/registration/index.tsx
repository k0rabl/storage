import { FC, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Button } from '@shared/button'
import { Input } from '@shared/input'
import { registrationPost } from '@features/auth/model/actions'


interface IParams {
    email: string
    password: string
    name: string
}

export const Registration: FC<{}> = () => {
    const nav = useNavigate()

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
        registrationPost(params)
        nav('/auth/login')
    }

    return (
        <>
            <img className="login__img" src="/label.png" alt="" />
            <h2 className="login__title">Sign Up</h2>
            <div className="login__inputs">
                <Input
                    name="email"
                    type="email"
                    changeInput={getValues}
                    label="E-Mail"
                />
                <Input
                    name="name"
                    type="text"
                    changeInput={getValues}
                    label="Name"
                />
                <Input
                    name="password"
                    type="password"
                    changeInput={getValues}
                    label="Password"
                />
            </div>

            <Button
                label="Registration"
                click={handleReg}
                classes={['login__btn']}
            />
            <div className="login__link">
                Already have an account?
                <Link to="/auth/login">Sign In</Link>
            </div>
            
        </>
    )
}
