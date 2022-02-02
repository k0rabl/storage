import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Add } from '../../features/storage/ui/add'
import { Layout } from '../../features/storage/ui/layout'
import { Path } from '../../features/storage/ui/path'
import { SpaceUsed } from '../../features/storage/ui/spaceUsed'
import { RootState } from '../../redux/store'

import './storage.sass'

interface IProps {}

const mapState = (state: RootState) => ({
  activeUser: state.auth.activeUser,
})


export const Storage: FC<IProps> = () => {
    const {activeUser} = useSelector(mapState)
    const nav = useNavigate()

    useEffect(() => {
      if (!activeUser) nav('/auth/login')
    }, [])

    return (
      <div className="storage">
        <Path/>
        <Layout/>
        <Add/>
        <SpaceUsed/>
      </div>  
    )
}
