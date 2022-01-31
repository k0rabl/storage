import { FC, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { Button } from '../../../../shared/button'
import { Input } from '../../../../shared/input'
import { createFolder } from '../../../storage/model/actions'
import { getFilesThunk } from '../../../storage/model/storageMiddleware'

import ModalContext from '../../model/context'
import './modal.sass'


const mapState = (state: RootState) => ({
  storage: state.storage,
})

export const Modal:FC<{}> = () => {
  const {isOpen, type, setOpen, handler} = useContext(ModalContext)
  const {storage: {currentFolder}} = useSelector(mapState)
  const dispatch = useDispatch()

  const [folderName, setFolderName] = useState<string>('New Folder')

  const getValues = (value: any) => {
    setFolderName(value.folderName)
  }

  const handleClick = (type: string) => {
    if(type === 'close') setOpen(false)
      
    if(type === 'addFolder') {      
      createFolder({name: folderName, parent: currentFolder, type: 'dir' })
      dispatch(getFilesThunk())
      setOpen(false)
    }

    handler()
  }


  return(
    <div className={`modalC ${isOpen && 'opened'}`}>
      <div className="modalC__content">
        <h6 className="modalC__title">{type === 'addFolder' ? 'Create folder' : 'Exit'}</h6>
        <p className="modalC__text">
          {
            type === 'addFolder' 
              ? <Input type="text" name="folderName" changeInput={getValues} label='New Folder'/> 
              : 'You realy want exit from edit-mode?'
          }
        </p>
        <div className="modalC__buttons buttons">
            <Button 
              label='No'
              click={() => handleClick('close')} 
              classes={['btn_no']}
            />
            <Button
                label={type === 'addFolder' ? 'Create' : 'Exit'}
                click={() => handleClick(type)}
                classes={['btn_yes']}

            />
        </div>    
      </div>
    </div>
  )
}