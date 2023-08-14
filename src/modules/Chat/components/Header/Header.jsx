import React, { useEffect, useState } from 'react';
import CallIcon from '@mui/icons-material/Call';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import './Header.scss';
import { selectThreadId, selectThreadName } from 'features/threadSlice';
import { useSelector } from 'react-redux';
import { selectUser } from 'features/userSlice';
import { db, realtimeDb } from '../../../../firebase';
import { child, get, onValue, ref } from 'firebase/database';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)


export function Header() {
  const threadId = useSelector(selectThreadId);
  const threadName = useSelector(selectThreadName);
  const user = useSelector(selectUser);
  const [threadInfo, setThreadInfo] = useState([]);

  const [interlocutorList, setInterlocutorList] = useState([]);
  const [interlocutorStatus, setInterlocutorStatus] = useState(null);
  const [interlocutorLastOnline, setInterlocutorLastOnline] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection('users').orderBy('displayName').get();
      setInterlocutorList(
        data.docs
          .map((doc) => ({
            ...doc.data(),
          }))
          .filter((user) => user.displayName === threadName)
      );
    };
    fetchData();
  }, [threadId, threadName]);

  useEffect(() => {
    const dbRef = ref(realtimeDb);
    const statusRef = ref(realtimeDb, `users/${interlocutorList[0]?.uid}/status`);
    const lastOnlineRef = ref(realtimeDb, `users/${interlocutorList[0]?.uid}/lastOnline`);

    onValue(statusRef, (snap) => {
      const data = snap.val();
      if (data === 'online') {
        setInterlocutorStatus('online');
      } else {
        setInterlocutorStatus('offline');
        get(child(dbRef, `users/${interlocutorList[0]?.uid}/lastOnline`)).then((snapshot) => {
          if (snapshot.exists()) {
            setInterlocutorLastOnline(snapshot.val());
          }
        });
      }
    });
  }, [interlocutorList]);

  return (
    <div className='chat__header'>
      <div className='chat__info'>
        <Avatar src={interlocutorList[0]?.photo} />
        <div className='chat__user'>
          <h4 className='user__name'>{threadName}</h4>
          <p className='user__last-seen'>
            last seen {dayjs(new Date(interlocutorLastOnline).toString()).fromNow()}
          </p>
        </div>
      </div>
      <div className='chat__utils'>
        <IconButton className='utils__icon'>
          <CallIcon />
        </IconButton>
        <IconButton className='utils__icon'>
          <SearchIcon />
        </IconButton>
        <IconButton className='utils__icon'>
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
}
