import { FC } from 'react'
import { Add } from '../../features/storage/ui/add'

import './storage.sass'

interface IProps {}

export const Storage: FC<IProps> = () => {
    return <div className="storage">
      <div className="storage__path">

      </div>
      <div className="storage__layout">

      </div>
      <Add/>
    </div>
}
