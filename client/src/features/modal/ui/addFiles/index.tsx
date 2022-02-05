import { ChangeEvent, FC, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { Button } from '../../../../shared/button'
import ModalContext from '../../model/context'
import { uploadFile } from '../../../storage/model/actions'
import { getFilesThunk } from '../../../storage/model/storageMiddleware'

// import './addFileModal.sass'

const mapState = (state: RootState) => ({
  storage: state.storage,
})

export const AddFileModal: FC<{}> = () => {
  const { setOpen } = useContext(ModalContext)
  const dispatch = useDispatch()

  const {storage: {currentFolder}} = useSelector(mapState)
  const [filesForUpload, setFiles] = useState<FileList | null>()

  
  const handleClose = () => {
    setOpen(false)
  }

  const handleSend = () => {
    uploadFile(filesForUpload, currentFolder).then(res => {
      dispatch(getFilesThunk())
      setOpen(false)
    })
  }

  const getFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const {files} = event.target
    setFiles(files)
  }

  return (
    <div className="addFiles">
        <p className="modalC__text">
          <input type="file" name="files" multiple onChange={getFiles} />              
        </p>
        <div className="modalC__buttons buttons">
            <Button 
              label='No'
              click={handleClose} 
              classes={['btn_no']}
            />
            <Button
                label='Upload'
                click={handleSend}
                classes={['btn_yes']}
            />
        </div>     
    </div>
  )
}

function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
