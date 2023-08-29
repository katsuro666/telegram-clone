import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'features/userSlice';
import './Settings.scss';
import { Paper, MenuList, MenuItem, ListItemIcon, Skeleton } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import PersonIcon from '@mui/icons-material/Person';
import { setIsEditProfileOpen, setIsSettingsOpen, setIsSelectLanguageOpen } from 'features/navSlice';

export function Settings() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const openEditProfile = () => {
    dispatch(setIsSettingsOpen(false));
    dispatch(setIsEditProfileOpen(true));
  };

  const openSelectLanguage = () => {
    dispatch(setIsSettingsOpen(false));
    dispatch(setIsSelectLanguageOpen(true));
  }

  return (
    <>
      <div className='profile-content'>
        <div className='profile__avatar'>
          {isLoading && <Skeleton variant='circular' width={100} height={100} />}
          <img
            src={user.photo}
            alt='your avatar'
            className='profile__img'
            draggable='false'
            onLoad={() => setIsLoading(false)}
          />
        </div>
        <span className='profile__displayname'>{user.displayName}</span>
        <span className='profile__username'>{`@${user.username}`}</span>
      </div>

      <Paper className='user-settings'>
        <MenuList className='user-settings__list'>
          <MenuItem className='user-settings__item' onClick={openEditProfile}>
            <ListItemIcon>
              <PersonIcon className='user-settings__icon' />
            </ListItemIcon>
            <div className='user-settings__text-item'>
              <span className='user-settings__text'>Edit profile</span>
            </div>
          </MenuItem>

          <MenuItem className='user-settings__item' onClick={openSelectLanguage}>
            <ListItemIcon>
              <TranslateIcon className='user-settings__icon' />
            </ListItemIcon>
            <div className='user-settings__text-item'>
              <span className='user-settings__text'>Language</span>
              <span className='user-settings__text--secondary'>English</span>
            </div>
          </MenuItem>
        </MenuList>
      </Paper>
    </>
  );
}
