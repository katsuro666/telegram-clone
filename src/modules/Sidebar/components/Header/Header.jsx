import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Header.scss';
import { Menu } from './components';
import useOutsideClick from 'app/hooks/useOutsideClick';
import {
  selectIsUserSearchOpen,
  setIsUserSearchOpen,
  selectIsSettingsOpen,
  setIsSettingsOpen,
  selectIsEditProfileOpen,
  setIsEditProfileOpen,
  setIsSelectLanguageOpen,
  selectIsSelectLanguageOpen,
} from 'features/navSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export function Header({ searchBarValue, setSearchBarValue }) {
  const { ref, isShow, setIsShow } = useOutsideClick(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isUserSearchOpen = useSelector(selectIsUserSearchOpen);
  const isSettingsOpen = useSelector(selectIsSettingsOpen);
  const isEditProfileOpen = useSelector(selectIsEditProfileOpen);
  const isSelectLanguageOpen = useSelector(selectIsSelectLanguageOpen);
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
    if (isEditProfileOpen) {
      dispatch(setIsEditProfileOpen(false));
      dispatch(setIsSettingsOpen(true));
    }
    if (isSelectLanguageOpen) {
      dispatch(setIsSelectLanguageOpen(false));
      dispatch(setIsSettingsOpen(true));
    }
  };

  return (
    <div className='sidebar__header'>
      <div className='header__burger'>
        {isUserSearchOpen || isSettingsOpen || isEditProfileOpen || isSelectLanguageOpen ? (
          <ArrowBackIcon className='arrow-back__btn' onClick={backArrowAction} />
        ) : (
          <MenuIcon className='burger__btn' onClick={() => setIsShow(!isShow)} />
        )}
      </div>

      {!isSettingsOpen && !isEditProfileOpen && !isSelectLanguageOpen && (
        <div className='header__search'>
          <SearchIcon className='header__searchIcon' />
          <input
            placeholder={t('Search')}
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
      )}

      <Menu className={isShow ? 'menu-show' : '--hide'} innerRef={ref} />
    </div>
  );
}
