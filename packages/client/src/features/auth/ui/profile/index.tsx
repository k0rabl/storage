import { FC, useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'

import { logOut } from '@features/auth/model/authSlice'
import ModalContext from '@features/modal/model/context'
import { SettingsModal } from '@features/modal/ui/settings'
import { ProfileModal } from '@features/modal/ui/profile'

import LogOutIcon from '@shared/svg/logOut'
import AvatarIcon from '@shared/svg/avatar'
import SettingsIcon from '@shared/svg/settings'

import './loginBtns.sass'
import { removeToken } from '@utils/tokens'


export const Profile: FC<{}> = () => {
    const { setOpen, setTitle, setChild } = useContext(ModalContext)
    const dispatch = useDispatch()
    const [isOpenMenu, setOpenMenu] = useState<boolean>(false)

    const handleOut = () => {
        dispatch(logOut())

        removeToken()
    }

    const toggleMenu = () => {
        setOpenMenu(!isOpenMenu)
    }

    const handleModal = (type: string) => {
        setTitle(type === 'settings' ? 'Settings' : 'Profile')
        setChild(type === 'settings' ? <SettingsModal /> : <ProfileModal />)
        setOpen(true)
    }

    return (
        <div className="profile">            
            <div className='profile__icon' onClick={toggleMenu}>
                <AvatarIcon />
            </div>   
            <div className={classNames([isOpenMenu && 'menu-open', 'menu', 'profile__menu'])}>
                <div onClick={() => handleModal('profile')} className="menu__element">
                    Profile
                    <AvatarIcon />
                </div>
                <div onClick={() => handleModal('settings')} className="menu__element">
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