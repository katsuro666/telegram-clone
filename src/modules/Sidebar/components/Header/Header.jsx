import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Header.scss';
import { Menu } from './components';
import useOutsideClick from 'app/hooks/useOutsideClick';
import { selectIsUserSearchOpen, setIsUserSearchOpen, selectIsSettingsOpen, setIsSettingsOpen } from 'features/navSlice';
import { useDispatch, useSelector } from 'react-redux';

export function Header({ searchBarValue, setSearchBarValue }) {
  const { ref, isShow, setIsShow } = useOutsideClick(false);
  const dispatch = useDispatch();

  const isUserSearchOpen = useSelector(selectIsUserSearchOpen);
  const isSettingsOpen = useSelector(selectIsSettingsOpen);

  const handleSearch = (state) => {
    dispatch(setIsUserSearchOpen(state));
  };

  const backArrowAction = () => {
    if (isUserSearchOpen) {
      dispatch(setIsUserSearchOpen(false));
    }
    if (isSettingsOpen) {
      dispatch(setIsSettingsOpen(false));
    }
  }

  return (
    <div className='sidebar__header'>
      <div className='header__burger'>
        {isUserSearchOpen || isSettingsOpen ? (
          <ArrowBackIcon className='arrow-back__btn' onClick={backArrowAction} />
        ) : (
          <MenuIcon className='burger__btn' onClick={() => setIsShow(!isShow)} />
        )}
      </div>
      <div className='header__search'>
        <SearchIcon className='header__searchIcon' />
        <input
          placeholder='Search'
          type='text'
          autoComplete='off'
          className='header__input'
          onClick={() => handleSearch(true)}
          value={searchBarValue}
          onChange={(e) => {
            setSearchBarValue(e.target.value);
          }}
        />
      </div>
      <Menu className={isShow ? 'menu-show' : '--hide'} innerRef={ref} />
    </div>
  );
}
