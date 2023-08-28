import React, { useState } from 'react';
import { TextField } from '@mui/material';
import './EditProfile.scss';
import { selectUser } from 'features/userSlice';
import { useSelector } from 'react-redux';

export function EditProfile() {
  const user = useSelector(selectUser);

  const [displayName, setDisplayName] = useState(user.displayName);
  const [username, setUsername] = useState(user.username);

  return (
    <div>
      <div className='edit-profile__fields'>
        <TextField
          className='edit-profile__textfield'
          label='Name'
          variant='outlined'
          size='small'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <TextField
          className='edit-profile__textfield'
          label='Username'
          variant='outlined'
          size='small'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <span className='edit-profile__info'>
          You can choose a username on <b>Telegram</b>. If you do, people will be able to find you by this username.
          <br />
          <br />
          You can use <b>a-z</b>, <b>0-9</b> and underscores. Minimum length is <b>5</b> characters.
        </span>
      </div>
    </div>
  );
}
