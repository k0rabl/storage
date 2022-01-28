import { Storage } from '../../pages/storage'
import { Auth } from '../../pages/auth'
import { RouteProps } from 'react-router'

export const routes: Array<RouteProps> = [
    {
        path: '/',
        element: <Storage />,
    },
    {
        path: '/auth/login',
        element: <Auth />,
    },
    {
        path: '/auth/registration',
        element: <Auth />,
    },
    {
        path: '/storage',
        element: <Storage />,
    },
]
