import classNames from 'classnames'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { handleCurrFolder } from '../../model/storageSlice'

import './element.sass'

import FileIcon from '../../../../shared/svg/file'
import BackIcon from '../../../../shared/svg/back'
import FolderIcon from '../../../../shared/svg/folder'

interface IElement {
  id: string
  name: string
  type: string
  path: string
  size: number
}

export const Element: FC<IElement> = ({id, name, type, path, size}) => {
  const dispatch = useDispatch()

  const handleClick = (id: string) => {
    dispatch(handleCurrFolder(id))
  }

  const classses = classNames([
    'element', 
    type === 'dir' 
      ? 'element-folder' :
        type === 'back' ? 'element-back'
      : 'element-file'
  ])
  
  return (
    <div onClick={() => handleClick(id)} title={String(size)} className={classses}>
      {
          type === 'dir' 
          ? <FolderIcon />  :
            type === 'back' ? <BackIcon/>
          : <FileIcon />
      }
      <div className="element__name">{name}</div>
    </div>
  )
}