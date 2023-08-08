import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Header.scss';
import { Menu } from './components';
import useOutsideClick from 'app/hooks/useOutsideClick';

export function Header({ searchIsOpen, setSearchIsOpen, searchBarValue, setSearchBarValue }) {
  const { ref, isShow, setIsShow } = useOutsideClick(false);

  return (
    <div className='sidebar__header'>
      <div className='header__burger'>
        {searchIsOpen ? (
          <ArrowBackIcon
            className='arrow-back__btn'
            onClick={() => setSearchIsOpen(false)}
          />
        ) : (
          <MenuIcon
            className='burger__btn'
            onClick={() => setIsShow(!isShow)}
          />
        )}
      </div>
      <div className='header__search'>
        <SearchIcon className='header__searchIcon' />
        <input
          placeholder='Search'
          type='text'
          autoComplete='off'
          className='header__input'
          onClick={() => setSearchIsOpen(true)}
          value={searchBarValue}
          onChange={(e) => {
            setSearchBarValue(e.target.value)
          }}
        />
      </div>
      <Menu className={isShow ? 'menu-show' : '--hide'} innerRef={ref} />
    </div>
  );
}
