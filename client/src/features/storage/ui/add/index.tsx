import { FC } from 'react'

import AddFileIcon from '../../../../shared/svg/addFile'
import AddFolderIcon from '../../../../shared/svg/addFolder'
import PlusIcon from '../../../../shared/svg/plus'

import './add.sass'

export const Add: FC<{}> = () => {
  return (
    <div className="add">
        <div className="add__btn">
          <PlusIcon />

          <div className="add__list">
            <div className="add__element">
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