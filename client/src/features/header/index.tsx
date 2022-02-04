import { FC } from 'react'
import { Profile } from '../auth/ui/profile'
import { Search } from '../search'

import './header.sass'



export const Header: FC<{}> = () => (
    <div className="header">
        <h1 className='header__logo'>
            <img className='header__logoImage' src="./label.png" alt="" />
            MyCloud
        </h1>
        <Search/>
        <Profile />
    </div>
)
