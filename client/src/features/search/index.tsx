import { FC } from 'react'

import './search.sass'
import SearchIcom from '../../shared/svg/search'

export const Search: FC<{}> = () => (
  <div className='search'>
    <input type="text" className='search__input' placeholder='Search'/>
    <div className="search__button">
      <SearchIcom />
    </div>
  </div>
)
