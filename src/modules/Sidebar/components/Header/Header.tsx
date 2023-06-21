import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.scss';
import { Menu } from './components';

export function Header() {

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='sidebar__header'>
      <div className="header__burger">
        <MenuIcon className='burger__btn' onClick={() => setIsOpen(!isOpen)}/>
      </div>
      <div className="header__search">
        <SearchIcon className='header__searchIcon'/>
        <input placeholder='Search' type="text" autoComplete='off' className="header__input" />
      </div>
      <Menu className={isOpen ? 'menu-show' : '--hide'} />
    </div>
  )
}
