import { type } from 'os'
import { FC, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import { Button } from '../../../../../shared/button'
import { Input } from '../../../../../shared/input'
import ModalContext from '../../../../modal/model/context'
import { createFolder } from '../../../model/actions'
import { getFilesThunk } from '../../../model/storageMiddleware'

// import './addFileModal.sass'

const mapState = (state: RootState) => ({
  storage: state.storage,
})

export const AddFolderModal: FC<{}> = () => {
  const {storage: {currentFolder}} = useSelector(mapState)
  const dispatch = useDispatch()
  const { setOpen } = useContext(ModalContext)

  const [folderName, setFolderName] = useState<string>('New Folder')


  const handleClose = () => {
    setOpen(false)
  }

  const getName = (value: any) => {
    setFolderName(value.folderName)
  }

  const handleSend = () => {
    createFolder({name: folderName, parent: currentFolder, type: 'dir' }).then(res => {
      dispatch(getFilesThunk())
      setOpen(false)
    })
  }

  return (
    <div className="addFolder">
        <p className="modalC__text">
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