import { FC, useContext } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

import AddFileIcon from '../../../../shared/svg/addFile'
import AddFolderIcon from '../../../../shared/svg/addFolder'
import PlusIcon from '../../../../shared/svg/plus'
import ModalContext from '../../../modal/model/context'
import { createFolder } from '../../model/actions'

import './add.sass'

const mapState = (state: RootState) => ({
  storage: state.storage,
})

export const Add: FC<{}> = () => {
  const context = useContext(ModalContext)
  const {storage: {currentFolder}} = useSelector(mapState)

  const handleShowModal = () => {
    const { setOpen, setType, setHandler } = context 
    
    setType('addFolder')
    setOpen(true)

    setHandler(createFolder, [currentFolder, 'dir', 'folder'])
  }
  return (
    <div className="add">
        <div className="add__btn">
          <PlusIcon />

          <div className="add__list">
            <div onClick={handleShowModal} className="add__element">
              <AddFolderIcon />
              Add folder
            </div>

            <div className="add__element">
              <AddFileIcon />
              Add file 
            </div>
          </div>
        </div>
      </div>
  )
}