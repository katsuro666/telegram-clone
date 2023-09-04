import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import './Thread.scss';
import { useDispatch, useSelector } from 'react-redux';
import { db, realtimeDb } from '../../../../../../firebase';
import { setThread } from 'features/threadSlice';
import { selectUser } from 'features/userSlice';
import { ref, onValue } from 'firebase/database';
import i18n from '../../../../../../i18n';

export function Thread({ messageData, selectedUser }) {
  const dispatch = useDispatch();
  const [messageList, setMessageList] = useState([]);
  const user = useSelector(selectUser);
  const [unseenMessages, setUnseenMessages] = useState([]);

  // state so that in the future, when choosing a thread, it can be highlighted in Threads
  // |
  // V
  const [isThreadOpen, setIsThreadOpen] = useState('');

  const [userStatus, setUserStatus] = useState('');

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

  useEffect(() => {
    const statusRef = ref(realtimeDb, `users/${selectedUser?.uid}/status`);

    const updateLastOnline = (snapshot) => {
      const data = snapshot.val();
      if (data === 'online') {
        setUserStatus('online');
      } else {
        setUserStatus('offline');
      }
    };

    const onValueCallback = onValue(statusRef, updateLastOnline);

    return () => {
      onValueCallback();
    };
  }, [selectedUser?.uid, userStatus]);

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

  const today = new Date().toLocaleDateString(i18n.language, { month: 'short', day: 'numeric' });
  const lastMsgShortDate = messageList[0]?.timestamp
    ?.toDate()
    .toLocaleDateString(i18n.language, { month: 'short', day: 'numeric' });

  // !
  // TODO add highlight of the thread you are chatting with
  // !

  return (
    <li className={`thread ${isThreadOpen && 'thread--open'}`} onClick={openThread}>
      <div className={`thread__avatar`}>
        <Avatar src={selectedUser?.photo} />
        <span className={userStatus === 'online' ? 'thread__avatar--online' : ''}></span>
      </div>
      <div className='thread__info'>
        <div className='thread__top-row'>
          <span className='thread__name'>{selectedUser?.displayName}</span>
          <div className='thread__indicators'>
            {messageList[0]?.uid === user.uid ? (
              messageList[0]?.seen ? (
                <DoneAllIcon className={`thread__status ${isThreadOpen && 'thread__status--open'}`} />
              ) : (
                <DoneIcon className={`thread__status ${isThreadOpen && 'thread__status--open'}`} />
              )
            ) : null}
            <small className={`thread__date ${isThreadOpen && 'thread__date--open'}`}>
              {today === lastMsgShortDate
                ? messageList[0]?.timestamp?.toDate().toLocaleString(i18n.language, {
                    hour: 'numeric',
                    minute: 'numeric',
                  })
                : lastMsgShortDate}
            </small>
          </div>
        </div>
        <div className='thread__bottom-row'>
          <span className={`thread__preview ${isThreadOpen && 'thread__preview--open'}`}>
            {messageList[0]?.message}
          </span>
          {unseenMessages.length > 0 && <div className='thread__unread-messages'>{unseenMessages.length}</div>}
        </div>
      </div>
    </li>
  );
}
