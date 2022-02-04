import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Button } from '../../../../shared/button'
import { logOut } from '../../model/authSlice'

import './loginBtns.sass'

export const Profile: FC<{}> = () => {
    const dispatch = useDispatch()
    const nav = useNavigate()

    const handleOut = () => {
        dispatch(logOut())

        nav('/auth/login')
    }

    return (
        <div className="buttons">
             <Button
                label="Sign Out"
                click={handleOut}
                classes={['btn-primary']}
            />
        </div>
    )
}