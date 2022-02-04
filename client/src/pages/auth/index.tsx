import { FC } from 'react'
import { useLocation } from 'react-router'
import Login from '../../features/auth/ui/login'
import { Registration } from '../../features/auth/ui/registration'

import './auth.sass'

interface IProps {}

export const Auth: FC<IProps> = () => {
    const location = useLocation()
    const path = location.pathname.slice(location.pathname.lastIndexOf('/'))

    return (
        <div className="auth">
            <div className="auth-container">
                {path === '/login' ? <Login /> : <Registration />}
            </div>
        </div>
    )
}
