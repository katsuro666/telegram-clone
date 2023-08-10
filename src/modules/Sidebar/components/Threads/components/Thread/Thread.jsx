import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import './Thread.scss';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../../../../firebase';
import { setThread } from 'features/threadSlice';
import { selectUser } from 'features/userSlice';

export function Thread({ messageData, selectedUser }) {
  const dispatch = useDispatch();
  const [threadInfo, setThreadInfo] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection('rooms')
      .doc(messageData.id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setThreadInfo(
          snapshot.docs.map((doc) => ({
            // console.log(doc.data);
            ...doc.data(),
          }))
        );
      });
  }, [messageData.id, user.uid]);

  return (
    <li
      className='thread'
      onClick={() =>
        dispatch(
          setThread({
            threadId: messageData.id,
            threadName: selectedUser.displayName,
            type: messageData.type,
            authorizedUsers: messageData.authorizedUsers,
          })
        )
      }>
      <Avatar src={selectedUser.photo} />
      <div className='thread__info'>
        <div className='thread__top-row'>
          <span className='thread__name'>{selectedUser.displayName}</span>
          <div className='thread__indicators'>
            {/* <DoneAllIcon className='thread__status' /> */}
            <small className='thread__date'>
              {threadInfo[0]?.timestamp?.toDate().toLocaleString('en-gb', {
                hour: 'numeric',
                minute: 'numeric',
              })}
            </small>
          </div>
        </div>
        <div className='thread__bottom-row'>
          <span className='thread__preview'>{threadInfo[0]?.message}</span>
          {/* <div className="thread__unread-messages">5</div> */}
        </div>
      </div>
    </li>
  );
}
