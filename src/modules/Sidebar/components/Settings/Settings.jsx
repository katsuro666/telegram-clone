import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'features/userSlice';
import './Settings.scss';
import { Paper, MenuList, MenuItem, ListItemIcon } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import PersonIcon from '@mui/icons-material/Person';
import { setIsEditProfileOpen, setIsSettingsOpen } from 'features/navSlice';

export function Settings() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const openEditProfile = () => {
    dispatch(setIsSettingsOpen(false));
    dispatch(setIsEditProfileOpen(true));
  };
  
  return (
    <>
      <div className='profile-content'>
        <div className='profile__avatar'>
          <img src={user.photo} alt='your avatar' className='profile__img' draggable='false' />
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

          <MenuItem className='user-settings__item'>
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
