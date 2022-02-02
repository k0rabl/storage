import { FunctionComponent } from 'react'
import LoginBtns from '../auth/ui/loginBtns'
import { Search } from '../search'

import './header.sass'

interface IProps {}

export const Header: FunctionComponent<IProps> = () => (
    <div className="header">
        <h1 className='header__logo'>
            <img className='header__logoImage' src="./label.png" alt="" />
            MyCloud
        </h1>
        <Search/>
        <LoginBtns />
    </div>
)
