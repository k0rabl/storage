import { type } from 'os'
import { FC, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { Button } from '../../../../shared/button'
import { Input } from '../../../../shared/input'
import ModalContext from '../../../modal/model/context'
import { createFolder } from '../../../storage/model/actions'
import { getFilesThunk } from '../../../storage/model/storageMiddleware'

import './addFolder.sass'

const mapState = (state: RootState) => ({
  storage: state.storage,
})

export const AddFolderModal: FC<{}> = () => {
  const {storage: {currentFolder}} = useSelector(mapState)
  const dispatch = useDispatch()
  const { setOpen } = useContext(ModalContext)

  const [folderName, setFolderName] = useState<string>('New Folder')
  const [color, setColor] = useState<string>('#000000')



  const handleClose = () => {
    setOpen(false)
  }

  const getName = (value: any) => {
    setFolderName(value.folderName)
  }

  const handleSend = () => {
    createFolder({name: folderName, parent: currentFolder, type: 'dir', color: color }).then(res => {
      dispatch(getFilesThunk())
      setOpen(false)
    })
  }

  return (
    <div className="addFolder">
        <p className="modalC__text">
          <div className="chooseColor">
            <div className="chooseColor__element black"></div>
            <div className="chooseColor__element red"></div>
            <div className="chooseColor__element chooseColor__element-choosen green"></div>
            <div className="chooseColor__element purple"></div>
            <div className="chooseColor__element yellow"></div>
            <div className="chooseColor__element pink"></div>
          </div>
         <Input type="text" name="folderName" changeInput={getName} label='New Folder'/> 
        </p>
        <div className="modalC__buttons buttons">
            <Button 
              label='No'
              click={handleClose} 
              classes={['btn_no']}
            />
            <Button
                label='Create'
                click={handleSend}
                classes={['btn_yes']}
            />
        </div>
    </div>
  )
}