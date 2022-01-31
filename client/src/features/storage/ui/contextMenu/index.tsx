import { FC } from 'react'
import classNames from 'classnames'

import './contextMenu.sass'

import Delete from '../../../../shared/svg/delete'
import { deleteFilePost } from '../../model/actions'
import { deleteFile } from '../../model/storageSlice'
import { useDispatch } from 'react-redux'


export const ContextMenu: FC<{isOpen: boolean, fileId: string}> = ({isOpen, fileId}) => {
  const dispatch = useDispatch()

  const deleteElement = () => {
    deleteFilePost(fileId)
    dispatch(deleteFile(fileId))
  }

  return(
    <div className={classNames([isOpen ? 'CM CM-open' : 'CM'])}>
      <div onClick={deleteElement} className="CM__element">
        <Delete/>
        Delete
      </div>
    </div>
  )
}