import classNames from 'classnames'
import { ChangeEvent, FC, useState } from 'react'

import './input.sass'

interface IProps {
    type: string
    name: string
    label?: string
    classes?: string[]
    changeInput: (value: object) => void
}

export const Input: FC<IProps> = ({
    type,
    classes,
    changeInput,
    name,
    label,
}) => {
    const [value, setValue] = useState('')

    const handleChange = ({
        target: { value, name },
    }: ChangeEvent<HTMLInputElement>) => {
        setValue(value)

        changeInput({ [name]: value })
    }

    return (
        <input
            name={name}
            type={type}
            value={value}
            placeholder={label}
            onChange={handleChange}
            className={classNames([classes])}
        />
    )
}
