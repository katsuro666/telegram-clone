import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'features/userSlice';
import './Settings.scss';
import { Paper, MenuList, MenuItem, ListItemIcon } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';

export function Settings() {
  const user = useSelector(selectUser);

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
