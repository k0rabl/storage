import { type } from 'os'
import { FC, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/store'
import { Button } from '@shared/button'
import { Input } from '@shared/input'
import ModalContext from '@features/modal/model/context'
import { createFolder } from '@features/storage/model/actions'
import { getFilesThunk } from '@features/storage/model/storageMiddleware'

import './addFolder.sass'

const mapState = (state: RootState) => ({
  storage: state.storage,
})

const colors: string[] = [
  '#000000', //black
  '#ffa500', //orange
  '#fa8072', //red
  '#ffc0cb', //pink
  '#9370db', //purple
  '#5f9ea0', //green
]

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

  const chooseColor = (color: string) => {
    setColor(color)
  }

  return (
    <div className="addFolder">
        <p className="modalC__text">
          <div className="colorPicker">
            {colors.map(element => (
              <div 
                key={element}
                className={
                  color === element 
                    ? 'colorPicker__element colorPicker__element-choosen' 
                    : 'colorPicker__element'
                  }
                style={{backgroundColor: element}}
                onClick={() => chooseColor(element)}
              ></div>
            ))}
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