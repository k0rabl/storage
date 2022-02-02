import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { getFilesThunk } from '../../model/storageMiddleware'
import { File } from '../../model/storageSlice'
import { Element } from '../element'

import './layout.sass'


const mapState = (state: RootState) => ({
  storage: state.storage,
})

export const Layout: FC<{}> = () => {
  const dispatch = useDispatch()
  const { storage: {files, currentFolder} } = useSelector(mapState)
  
  const [currFiles, setCurrFiles] = useState<File[]>([...files])
  const [folder, setFolder] = useState<File>()

  useEffect(() => {    
    dispatch(getFilesThunk())
  }, [dispatch])

  useEffect(() => {
    if(currentFolder){
      setFolder(files.find(element => element._id === currentFolder))
      setCurrFiles(files.filter(element => element.parent === currentFolder))
    } else {
      setCurrFiles(files.filter(element => !element.parent))
    }
    
 

  }, [files, currentFolder])
  
  return (
    <div className="layout">
      {
        currentFolder &&
        <Element 
          key={folder?.parent}
          id={folder?.parent || ''}
          name='Back'
          type='back'
          path=''
          size={0}
        />
      }

      {
        !currFiles.length 
          ? <div className="storage-empty">Folder is empty</div>
          : currFiles.map(({_id, name, type, path, size}: File) => 
            <Element 
              key={_id}
              id={_id}
              name={name}
              type={type}
              path={path}
              size={size}
            />
          ) 
      }
        
    </div>
  )
}