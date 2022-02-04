import classNames from 'classnames'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { logOut } from '../../model/authSlice'

import './loginBtns.sass'
import LogOutIcon from '../../../../shared/svg/logOut'
import AvatarIcon from '../../../../shared/svg/avatar'
import SettingsIcon from '../../../../shared/svg/settings'


export const Profile: FC<{}> = () => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const [isOpen, setOpen] = useState<boolean>(false)

    const handleOut = () => {
        dispatch(logOut())

        nav('/auth/login')
    }

    const toggleMenu = () => {
        setOpen(!isOpen)
    }

    return (
        <div className="profile">            
            <div className='profile__icon' onClick={toggleMenu}>
                <AvatarIcon />
            </div>   
            <div className={classNames([isOpen && 'menu-open', 'menu', 'profile__menu'])}>
                <div className="menu__element">
                    Profile
                    <AvatarIcon />
                </div>
                <div className="menu__element">
                    Settings
                    <SettingsIcon  />
                </div>
                <div onClick={handleOut} className="menu__element">
                    Log out
                    <LogOutIcon />  
                </div>
            </div>
        </div>
    )
}