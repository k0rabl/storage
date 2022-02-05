import classNames from 'classnames'
import { FC, MouseEvent, useEffect, useState, DragEvent, ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { handleCurrFolder } from '../../model/storageSlice'
import { ContextMenu } from '../contextMenu'
import { downloadFile } from '../../model/actions'

import './element.sass'

import FileIcon from '../../../../shared/svg/fileTypes/file'
import BackIcon from '../../../../shared/svg/fileTypes/back'
import FolderIcon from '../../../../shared/svg/fileTypes/folder'
import SVGIcon from '../../../../shared/svg/fileTypes/svg'
import PngIcon from '../../../../shared/svg/fileTypes/png'
import JpgIcon from '../../../../shared/svg/fileTypes/jpg'
import ArchiveIcon from '../../../../shared/svg/fileTypes/archive'
import ExeIcon from '../../../../shared/svg/fileTypes/exe'
import HtmlIcon from '../../../../shared/svg/fileTypes/html'
import GifIcon from '../../../../shared/svg/fileTypes/gif'
import JsIcon from '../../../../shared/svg/fileTypes/js'

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
  const [icon, setIcon] = useState<ReactElement>()

  useEffect(() => {

    switch (type) {
      case 'dir':
        setIcon(<FolderIcon />)
        break       
      case 'back':
        setIcon(<BackIcon />)
        break
      case 'image/jpeg':
        setIcon(<JpgIcon/>)
        break
      case 'image/png':
        setIcon(<PngIcon/>)
        break
      case 'image/svg': 
        setIcon(<SVGIcon/>)
        break
      case 'image/gif': 
        setIcon(<GifIcon/>)
        break
      case 'application/x-zip-compressed':
        setIcon(<ArchiveIcon/>)
        break
      case 'application/x-msdownload': 
       setIcon(<ExeIcon/>)
       break
      case 'text/html': 
        setIcon(<HtmlIcon/>)
        break 
      case 'text/javascript': 
        setIcon(<JsIcon/>)
        break
      default:  
        setIcon(<FileIcon />)
        break
    }
  
  }, []);
  

  const handleClick = (id: string) => {
    if (type === 'dir' || type === 'back')
      dispatch(handleCurrFolder(id))
    else
      downloadFile(id)
  }

  const handleMenu = (event: MouseEvent<HTMLDivElement>) =>{
    event.preventDefault()
    setOpenCM(!isOpenCM)
  } 

  // useEffect(() => {
  //   // window.addEventListener('mousedown', () => setOpenCM(false))
  
  // }, []);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()

    console.log(e);    
  }
  

  const classses = classNames([
    'element', 
    isOpenCM && 'element-active', 
    type === 'dir' 
      ? 'element-folder' :
        type === 'back' ? 'element-back'
      : 'element-file'
  ])
  
  return (
    <div className='element__container' draggable="true" onDragStart={handleDrag}> 
      <div onContextMenu={handleMenu} onClick={() => handleClick(id)} title={String(size)} className={classses}>
        {icon}
        <div className="element__name">{name}</div>
      </div>
      
      <ContextMenu isOpen={isOpenCM} fileId={id}/>
    </div>
  )
}