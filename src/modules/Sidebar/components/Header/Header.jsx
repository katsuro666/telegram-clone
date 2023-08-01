import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.scss';
import { Menu } from './components';
import useOutsideClick from 'app/hooks/useOutsideClick';

export function Header() {

const {ref, isShow, setIsShow} = useOutsideClick(false)

  return (
    <div className='sidebar__header'>
      <div className="header__burger">
        <MenuIcon className='burger__btn' onClick={() => setIsShow(!isShow)}/>
      </div>
      <div className="header__search">
        <SearchIcon className='header__searchIcon'/>
        <input placeholder='Search' type="text" autoComplete='off' className="header__input" />
      </div>
      <Menu className={isShow ? 'menu-show' : '--hide'} innerRef={ref} />
    </div>
  )
}