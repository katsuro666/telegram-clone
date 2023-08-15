import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import './Thread.scss';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../../../../firebase';
import { setThread } from 'features/threadSlice';
import { selectUser } from 'features/userSlice';

export function Thread({ messageData, selectedUser }) {
  const dispatch = useDispatch();
  const [messageList, setMessageList] = useState([]);
  const user = useSelector(selectUser);
  const [unseenMessages, setUnseenMessages] = useState([]);

  useEffect(() => {
    db.collection('rooms')
      .doc(messageData.id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessageList(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
          }))
        );
      });
  }, [messageData.id, user.uid]);

  useEffect(() => {
    setUnseenMessages(
      messageList.filter((message) => {
        if (message.seen === false && message.uid !== user.uid) {
          return message;
        }
        return null;
      })
    );
  }, [messageList, user.uid]);

  const openThread = () => {
    dispatch(
      setThread({
        threadId: messageData.id,
        threadName: selectedUser.displayName,
        type: messageData.type,
        authorizedUsers: messageData.authorizedUsers,
      })
    );

    db.collection('rooms')
      .doc(messageData.id)
      .collection('messages')
      .where('seen', '==', false)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().uid !== user.uid) {
            doc.ref.update({
              seen: true,
            });
          }
        });
      });

    setUnseenMessages([]);
  };

  return (
    <li className='thread' onClick={openThread}>
      <Avatar src={selectedUser.photo} />
      <div className='thread__info'>
        <div className='thread__top-row'>
          <span className='thread__name'>{selectedUser.displayName}</span>
          <div className='thread__indicators'>
            {messageList[0]?.uid === user.uid ? (
              messageList[0]?.seen ? (
                <DoneAllIcon className='thread__status' />
              ) : (
                <DoneIcon className='thread__status' />
              )
            ) : null}
            <small className='thread__date'>
              {messageList[0]?.timestamp?.toDate().toLocaleString('en-gb', {
                hour: 'numeric',
                minute: 'numeric',
              })}
            </small>
          </div>
        </div>
        <div className='thread__bottom-row'>
          <span className='thread__preview'>{messageList[0]?.message}</span>
          {unseenMessages.length > 0 && <div className='thread__unread-messages'>{unseenMessages.length}</div>}
        </div>
      </div>
    </li>
  );
}
