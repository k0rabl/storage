import { FC, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/store'
import { handleCurrFolder } from '@features/storage/model/storageSlice'

import './path.sass'


const mapState = (state: RootState) => ({
  activeUser: state.auth.activeUser,
  storage: state.storage
})

interface IPath {
  id: string
  name: string
}

export const Path: FC = () => {
  const { activeUser, storage: {currentFolder, files} } = useSelector(mapState) 
  const dispatch = useDispatch()
  const [path, setPath] = useState<IPath[]>([])

  useMemo(() => {
    const pathArr: IPath[] = []

    const getParents = (id: string) => {
      const file = files.find(el => el._id === id)

      if (file){
        pathArr.push({name: file.name, id: file._id})

        if (file.parent) getParents(file.parent)
        else return null
      } 
    } 
    
    getParents(currentFolder)
    pathArr.push({name: `${activeUser?.name ?? 'User'} cloud`, id: ''})
    
    setPath([...pathArr.reverse()])
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFolder])

  const handleClick = (id: string) => {
    if (id !== currentFolder) dispatch(handleCurrFolder(id))
  } 

  return (
    <div className="path">
       {path.map((elem, index) => 

          <div  key={elem.id} onClick={() => handleClick(elem.id)} className="path__element">
            <span className="path__folder">{elem.name}</span>
            {index !== path.length -1 && <span className="path__split">/</span>}
          </div>

       )}
    </div>
  )
}