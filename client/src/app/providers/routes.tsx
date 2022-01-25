import { Storage } from '../../pages/storage'
import Auth from '../../pages/auth'
import { RouteProps } from 'react-router'

export const routes: Array<RouteProps> = [
  {
    path: '/auth',
    element: <Auth/>
  },
  {
    path: '/storage',
    element: <Storage/>
  },
]
