import classNames from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import './button.sass'

interface IProps {
    label: string
    click?: () => void
    classes: string[]
    route?: string
    isLoading?: boolean
}

export const Button: FC<IProps> = ({ label, click, classes, route, isLoading }) => (
    <>
        {
            route 
                ? <Link onClick={click} className={classNames(['btn', ...classes])} to={route}>
                    { isLoading ? (
                        <div className={'loader'}>
                            <div className={'bubbleLoader'} />
                        </div>
                    ) : label }
                  </Link> 
                : <div onClick={click} className={classNames(['btn', ...classes])}>
                    { isLoading ? (
                        <div className={'loader'}>
                            <div className={'bubbleLoader'} />
                        </div>
                    ) : label }
                </div>


        }
    </>
)
