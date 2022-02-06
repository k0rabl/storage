import classNames from 'classnames'
import { FC, useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { logOut } from '../../model/authSlice'
import ModalContext from '../../../modal/model/context'
import { SettingsModal } from '../../../modal/ui/settings'
import { ProfileModal } from '../../../modal/ui/profile'


import './loginBtns.sass'
import LogOutIcon from '../../../../shared/svg/logOut'
import AvatarIcon from '../../../../shared/svg/avatar'
import SettingsIcon from '../../../../shared/svg/settings'


export const Profile: FC<{}> = () => {
    const { setOpen, setTitle, setChild } = useContext(ModalContext)
    const dispatch = useDispatch()
    const nav = useNavigate()
    const [isOpenMenu, setOpenMenu] = useState<boolean>(false)

    const handleOut = () => {
        dispatch(logOut())

        nav('/auth/login')
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