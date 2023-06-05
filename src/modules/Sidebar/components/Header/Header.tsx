import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.scss';

export function Header() {
  return (
    <div className='sidebar__header'>
      <div className="header__burger">
          <MenuIcon className='burger__btn'/>
        </div>
        <div className="header__search">
          <SearchIcon className='header__searchIcon'/>
          <input placeholder='Search' type="text" autoComplete='off' className="header__input" />
        </div>
    </div>
  )
}
