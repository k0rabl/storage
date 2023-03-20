import { FC, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'

import { deleteFilePost, downloadFile } from '../../model/actions'
import { deleteFile } from '../../model/storageSlice'

import DeleteIcon from '@shared/svg/delete'
import DownloadIcon from '@shared/svg/download'

import './contextMenu.sass'


export const ContextMenu: FC<{isOpen: boolean, fileId: string, handleOpen: (isOpen: boolean) => void}> = ({isOpen, fileId, handleOpen}) => {
  const dispatch = useDispatch()
  const wrapperRef = useRef<HTMLDivElement>(document.createElement("div"))

  const deleteElement = () => {
    deleteFilePost(fileId)
    dispatch(deleteFile(fileId))
  }

  const downloadElement = () => {    
    downloadFile(fileId)    
  }

  useEffect(() => {
    if (!wrapperRef || wrapperRef === null) {
      return
    }

    function handleClickOutside(event: Event) {
      if (!wrapperRef.current.contains(event.target as Node)) {
        handleOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleOpen, wrapperRef])


  return(
    <div className={classNames([isOpen ? 'CM CM-open' : 'CM'])} ref={wrapperRef}>
      <div onClick={deleteElement} className="CM__element CM__delete">
        <DeleteIcon/>
        Delete
      </div>
      <div onClick={downloadElement} className="CM__element CM__download">
        <DownloadIcon/>
        Download
      </div>
    </div>
  )
}