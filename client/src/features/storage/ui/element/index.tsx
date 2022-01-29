import classNames from 'classnames'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { handleCurrFolder } from '../../model/storageSlice'

import './element.sass'

interface Element {
  id: string
  name: string
  type: string
  path: string
  size: number
}

export const Element: FC<Element> = ({id, name, type, path, size}) => {
  const dispatch = useDispatch()

  const handleClick = (id: string) => {
    dispatch(handleCurrFolder(id))
  }
  
  return (
    <div onClick={() => handleClick(id)} title={String(size)} className={classNames(['element', type === 'dir' ? 'element__folder' : 'element__file'])}>
      {name}
    </div>
  )
}