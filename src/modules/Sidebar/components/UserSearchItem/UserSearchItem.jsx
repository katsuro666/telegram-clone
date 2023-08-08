import React from 'react';
import { Avatar } from '@mui/material';
import { setThread } from 'features/threadSlice';
import { useDispatch } from 'react-redux';
import './UserSearchItem.scss';

export function UserSearchItem({ user, setSearchIsOpen }) {
  const dispatch = useDispatch();

  const setNewThread = () => {
    dispatch(
      setThread({
        threadId: user.uid,
        threadName: user.threadName,
      })
    );
    setSearchIsOpen(false);
  };

  return (
    <li className='search-item' onClick={setNewThread}>
      <Avatar src={user.photo} />
      <div className='search-item__info'>
        <span className='search-item__name'>{user.displayName}</span>
        <span className='search-item__shortname'>{`@${user.displayName.toLowerCase()}`}</span>
      </div>
    </li>
  );
}
