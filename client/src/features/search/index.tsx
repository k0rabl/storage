import { FC } from 'react'

import SearchIcom from '@shared/svg/search'

import './search.sass'

export const Search: FC<{}> = () => (
  <div className='search'>
    <input type="text" className='search__input' placeholder='Search'/>
    <div className="search__button">
      <SearchIcom />
    </div>
  </div>
)
