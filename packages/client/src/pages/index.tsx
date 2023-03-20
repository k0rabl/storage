import { Route, Routes, useNavigate } from 'react-router'
import { routes } from '@app/providers/routes'
import { getToken } from '@utils/tokens'
import { useEffect } from 'react'

export const Routing = () => {
    const nav = useNavigate()
    const token = getToken()

    useEffect(() => {
      token
        ? nav('/storage')
        : nav('/auth/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])
        
    return(
        <Routes>
            {routes.map(({ path, element }, key) => (
                <Route key={key} path={path} element={element} />
            ))}
        </Routes>
    )}
