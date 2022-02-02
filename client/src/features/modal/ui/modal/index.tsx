import { ChangeEvent, FC, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { Button } from '../../../../shared/button'
import { Input } from '../../../../shared/input'
import { createFolder, uploadFile } from '../../../storage/model/actions'
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
  const [filesForUpload, setFiles] = useState<FileList | null>()

  const getValues = (value: any) => {
    setFolderName(value.folderName)
  }

  const handleClick = (type: string) => {
    if(type === 'close') setOpen(false)

    if(type === 'addFolder') {      
      createFolder({name: folderName, parent: currentFolder, type: 'dir' }).then(res => {
        dispatch(getFilesThunk())
        setOpen(false)
      })
    }

    if(type === 'addFiles'){
      uploadFile(filesForUpload, currentFolder).then(res => {
        dispatch(getFilesThunk())
        setOpen(false)
      })
    }

    handler()
  }

  const uploadFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const {files} = event.target
    setFiles(files)
  }


  return(
    <div className={`modalC ${isOpen && 'opened'}`}>
      <div className="modalC__content">
        <h6 className="modalC__title">{type === 'addFolder' ? 'Create folder' : 'Exit'}</h6>
        <p className="modalC__text">
          {
            type === 'addFolder' 
              ? <Input type="text" name="folderName" changeInput={getValues} label='New Folder'/> 
                : type === 'addFiles' ?  <input type="file" name="files" multiple onChange={uploadFiles} /> 
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