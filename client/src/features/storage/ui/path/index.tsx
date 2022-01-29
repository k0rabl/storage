import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

import './path.sass'


const mapState = (state: RootState) => ({
  activeUser: state.auth.activeUser,
  storage: state.storage
})

export const Path: FC<{}> = () => {
  const { activeUser } = useSelector(mapState) 

  return (
    <div className="path">
      {activeUser?.name ?? 'User'} Cloud / Folder / a
    </div>
  )
}