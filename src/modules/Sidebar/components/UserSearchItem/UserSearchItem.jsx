import React from 'react';
import { Avatar } from '@mui/material';
import { setThread } from 'features/threadSlice';
import { useDispatch, useSelector } from 'react-redux';
import './UserSearchItem.scss';
import { selectUser } from 'features/userSlice';
import { db } from '../../../../firebase';

export function UserSearchItem({ selectedUser, setSearchIsOpen }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const setNewThread = async () => {
    let roomId = '';

    const isRoomCreated = await db
      .collection('rooms')
      .where('uniqueId', '==', user.uid + selectedUser.uid)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log('room does not exist, creating room... ');
          return false;
        } else {
          console.log('room exists');
          console.log('room info: ', querySnapshot.docs[0].data());
          roomId = querySnapshot.docs[0].id;
          return true;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    if (!isRoomCreated) {
      var newRoomRef = await db.collection('rooms').add({
        type: 'personal',
        authorizedUsers: [user.uid, selectedUser.uid],
        uniqueId: user.uid + selectedUser.uid,
      });

      newRoomRef.update({
        id: newRoomRef.id,
      });

      roomId = newRoomRef.id;
    }

    dispatch(
      setThread({
        threadId: roomId,
        threadName: selectedUser.displayName,
        type: 'personal',
        authorizedUsers: [user.uid, selectedUser.uid],
      })
    );
    setSearchIsOpen(false);
  };

  return (
    <li className='search-item' onClick={setNewThread}>
      <Avatar src={selectedUser.photo} />
      <div className='search-item__info'>
        <span className='search-item__name'>{selectedUser.displayName}</span>
        <span className='search-item__shortname'>{`@${selectedUser.displayName.toLowerCase()}`}</span>
      </div>
    </li>
  );
}
