import React from 'react';
import { Avatar } from '@mui/material';
import { setThread } from 'features/threadSlice';
import { useDispatch, useSelector } from 'react-redux';
import './UserSearchItem.scss';
import { selectUser } from 'features/userSlice';
import { db } from '../../../../firebase';
import { collection, getDocs, or, query, where } from 'firebase/firestore';

export function UserSearchItem({ selectedUser, setSearchIsOpen }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const setNewThread = async () => {
    let roomId = '';

    const roomsRef = collection(db, 'rooms');

    const q = query(
      roomsRef,
      or(
        where('uniqueId', '==', user.uid + selectedUser.uid),
        where('uniqueId', '==', selectedUser.uid + user.uid)
      )
    );

    const isRoomCreated = await getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          return false;
        } else {
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
