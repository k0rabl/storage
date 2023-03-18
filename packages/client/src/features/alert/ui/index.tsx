import {FC, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearAlert } from '@features/alert/model/alertSlice';
import { RootState } from '@store/store';

import classNames from 'classnames';

import styles from './index.module.sass'


const mapState = (state: RootState) => ({
    alert: state.alert,
})


const Alert: FC = () => {
    const { alert } = useSelector(mapState)
    const dispatch = useDispatch()
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (alert.value.length){
            setActive(true)
        }

        if (alert.value.length) {
            setTimeout(() => {
                setActive(false)
                dispatch(clearAlert())
            }, 3000)
        }
    }, [dispatch, alert.value])
    

    return (
        <div className={ classNames([styles.alert, active && styles.alertActive]) }>
            <div className={ styles.alertText }>
                { alert.value }
            </div>
        </div>
    )
}

export default Alert