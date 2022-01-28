import classNames from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import './button.sass'

interface IProps {
    label: string
    click?: () => void
    classes: string[]
    route?: string
}

export const Button: FC<IProps> = ({ label, click, classes, route }) => (
    <div onClick={click} className={classNames(['btn', ...classes])}>
        {route ? <Link to={route}>{label}</Link> : label}
    </div>
)
