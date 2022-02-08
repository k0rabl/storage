import { DragEvent, FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { getFilesThunk } from '../../model/storageMiddleware'
import { uploadFile } from '../../../storage/model/actions'
import { File } from '../../model/storageSlice'
import { Element } from '../element'

import './layout.sass'
import CloudIcon from '../../../../shared/svg/cloud'


const mapState = (state: RootState) => ({
  storage: state.storage,
})

export const Layout: FC<{}> = () => {
  const { storage: {files, currentFolder} } = useSelector(mapState)  
  const [folder, setFolder] = useState<File>()
  const [dropZone, setDropZone] = useState<boolean>(false)
  const dispatch = useDispatch()


  useEffect(() => {    
    dispatch(getFilesThunk())      
  }, [])

  const cancelDefault = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()

    setDropZone(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()

    setDropZone(false)
  }

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()

    setDropZone(false)

    if(e.dataTransfer.files.length){
      await uploadFile(e.dataTransfer.files, currentFolder)
      dispatch(getFilesThunk())
    }
  }

  useEffect(() => {

    if(currentFolder)
      setFolder(files.find(element => element._id === currentFolder))

  }, [files, currentFolder])
  
  return (
    <div className='layout' onDragEnter={handleDragEnter}>
      <div
        className={dropZone ? 'layout__dropzone-active layout__dropzone': 'layout__dropzone'} 
        onDragLeave={handleDragLeave}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        onDragOver={cancelDefault}
      >
        <CloudIcon />
        <h3>
          Drop your Files here
        </h3>
      </div>
      {
        currentFolder &&
        <Element 
          key={folder?.parent}
          id={folder?.parent || ''}
          name='Back'
          type='back'
          color='#000000'
          size={0}
        />
      }

      {files
        .filter(element =>  currentFolder 
          ? element.parent === currentFolder 
          : !element.parent)
        .map(({_id, name, type, color, size}: File) => 
          <Element 
            key={_id}
            id={_id}
            color={color}
            name={name}
            type={type}
            size={size}
          />
        ) 
        // <div className="storage-empty">Folder is empty</div>
      }
        
    </div>
  )
}