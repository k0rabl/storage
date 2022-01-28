import { FunctionComponent } from 'react'
import LoginBtns from '../auth/ui/loginBtns'

import './header.sass'

interface IProps {}

export const Header: FunctionComponent<IProps> = () => (
    <div className="header">
        <h1>MyCloud</h1>
        <p>Search-bar</p>
        <LoginBtns />
    </div>
)
