import { Route, Routes } from 'react-router'
import { routes } from '../app/providers/routes'

export const Routing = () => (
    <Routes>
        {routes.map(({ path, element }, key) => (
            <Route key={key} path={path} element={element} />
        ))}
    </Routes>
)
