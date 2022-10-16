import { FC } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'

import { deleteFilePost, downloadFile } from '../../model/actions'
import { deleteFile } from '../../model/storageSlice'

import DeleteIcon from '@shared/svg/delete'
import DownloadIcon from '@shared/svg/download'

import './contextMenu.sass'


export const ContextMenu: FC<{isOpen: boolean, fileId: string}> = ({isOpen, fileId}) => {
  const dispatch = useDispatch()

  const deleteElement = () => {
    deleteFilePost(fileId)
    dispatch(deleteFile(fileId))
  }

  const downloadElement = () => {    
    downloadFile(fileId)    
  }

  return(
    <div className={classNames([isOpen ? 'CM CM-open' : 'CM'])}>
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