import { FC, useContext } from 'react'

import AddFileIcon from '../../../../shared/svg/addFile'
import AddFolderIcon from '../../../../shared/svg/addFolder'
import PlusIcon from '../../../../shared/svg/plus'
import ModalContext from '../../../modal/model/context'

import './add.sass'


export const Add: FC<{}> = () => {
  const context = useContext(ModalContext)

  const handleShowModal = () => {
    const { setOpen, setType } = context 
    
    setType('addFolder')
    setOpen(true)

    
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