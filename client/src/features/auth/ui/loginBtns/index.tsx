import { FC, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useNavigate } from 'react-router'
import { RootState } from '../../../../redux/store'
import { Button } from '../../../../shared/button'
import { logOut } from '../../model/authSlice'

import './loginBtns.sass'

const mapState = (state: RootState) => ({
    activeUser: state.auth.activeUser,
})

const mapDispatch = {
    logOut,
}

const connector = connect(mapState, mapDispatch)

type IProps = ConnectedProps<typeof connector>

const LoginBtns: FC<IProps> = (props) => {
    const { logOut, activeUser } = props
    const nav = useNavigate()

    const handleOut = () => {
        logOut()

        nav('/auth/login')
    }

    return (
        <div className="buttons">
            {activeUser ? (
                <Button
                    label="Sign Out"
                    click={handleOut}
                    classes={['btn-primary']}
                />
            ) : (
                <div className="buttons__login">
                    <Button
                        label="Sign In"
                        route="/auth/login"
                        classes={['btn-primary']}
                    />
                    <Button
                        label="Sign Up"
                        route="/auth/registration"
                        classes={['btn-secondly']}
                    />
                </div>
            )}
        </div>
    )
}

export default connector(LoginBtns)
