import classNames from 'classnames'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleCurrFolder } from '../../model/storageSlice'

import './element.sass'

import FileIcon from '../../../../shared/svg/file'
import BackIcon from '../../../../shared/svg/back'
import FolderIcon from '../../../../shared/svg/folder'
import { ContextMenu } from '../contextMenu'

interface IElement {
  id: string
  name: string
  type: string
  path: string
  size: number
}

export const Element: FC<IElement> = ({id, name, type, path, size}) => {
  const dispatch = useDispatch()
  const [isOpenCM, setOpenCM] = useState<boolean>(false)

  const handleClick = (id: string) => {
    if (type === 'dir' || type === 'back')
      dispatch(handleCurrFolder(id))
  }

  const handleMenu = (event: MouseEvent<HTMLDivElement>) =>{
    event.preventDefault()
    setOpenCM(!isOpenCM)
  } 

  useEffect(() => {
    // window.addEventListener('mousedown', () => setOpenCM(false))
  
  }, []);
  

  const classses = classNames([
    'element', 
    isOpenCM && 'element-active', 
    type === 'dir' 
      ? 'element-folder' :
        type === 'back' ? 'element-back'
      : 'element-file'
  ])
  
  return (
    <div className='element__container'>
    <div onContextMenu={handleMenu} onClick={() => handleClick(id)} title={String(size)} className={classses}>
      {
          type === 'dir' 
          ? <FolderIcon />  :
            type === 'back' ? <BackIcon/>
          : <FileIcon />
      }
      <div className="element__name">{name}</div>
    </div>
    
    <ContextMenu isOpen={isOpenCM} fileId={id}/>
    </div>
  )
}