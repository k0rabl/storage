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
    <>
        {
            route 
                ? <Link onClick={click} className={classNames(['btn', ...classes])} to={route}>{label}</Link> 
                : <div onClick={click} className={classNames(['btn', ...classes])}>{label}</div>
        }
    </>
)
