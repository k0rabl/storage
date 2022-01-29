import { FC } from 'react'
import { Add } from '../../features/storage/ui/add'
import { Layout } from '../../features/storage/ui/layout'
import { Path } from '../../features/storage/ui/path'

import './storage.sass'

interface IProps {}

export const Storage: FC<IProps> = () => {
    return <div className="storage">
      <Path/>
      <Layout/>
      <Add/>
    </div>
}
