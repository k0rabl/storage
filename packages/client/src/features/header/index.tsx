import { FC } from 'react'
import CloudIcon from '@shared/svg/cloud'
import { Profile } from '@features/auth/ui/profile'
import { Search } from '@features/search'

import './header.sass'

export const Header: FC<{}> = () => (
    <div className="header">
        <h1 className='header__logo'>
            <CloudIcon />
            MyCloud
        </h1>
        <Search/>
        <Profile />
    </div>
)
