import React from 'react';
import { Avatar } from '@mui/material';
import { setThread } from 'features/threadSlice';
import { useDispatch, useSelector } from 'react-redux';
import './UserSearchItem.scss';
import { selectUser } from 'features/userSlice';
import { db } from '../../../../firebase';

export function UserSearchItem({ userItem, setSearchIsOpen }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const setNewThread = () => {
    dispatch(
      setThread({
        threadId: userItem.uid,
        threadName: userItem.displayName,
      })
    );

    db.collection('users')
      .doc(user.uid)
      .collection('threads')
      .doc(userItem.uid)
      .set({
        threadName: userItem.displayName,
        // threadId: userItem.uid,
      });
    setSearchIsOpen(false);
  };

  return (
    <li className='search-item' onClick={setNewThread}>
      <Avatar src={userItem.photo} />
      <div className='search-item__info'>
        <span className='search-item__name'>{userItem.displayName}</span>
        <span className='search-item__shortname'>{`@${userItem.displayName.toLowerCase()}`}</span>
      </div>
    </li>
  );
}
