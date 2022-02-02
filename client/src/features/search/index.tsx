import { FunctionComponent } from 'react'

import './search.sass'
import SearchIcom from '../../shared/svg/search'
interface IProps {}

export const Search: FunctionComponent<IProps> = () => (
  <div className='search'>
    <input type="text" className='search__input' placeholder='Search'/>
    <div className="search__button">
      <SearchIcom />
    </div>
  </div>
)
