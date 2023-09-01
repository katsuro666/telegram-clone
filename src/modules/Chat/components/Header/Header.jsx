import React, { useEffect, useState } from 'react';
import CallIcon from '@mui/icons-material/Call';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import './Header.scss';
import { selectThreadId, selectThreadName } from 'features/threadSlice';
import { useSelector } from 'react-redux';
import { db, realtimeDb } from '../../../../firebase';
import { child, get, onValue, ref } from 'firebase/database';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTranslation } from 'react-i18next';
import i18n from '../../../../i18n';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';


export function Header() {
  dayjs.locale(i18n.language)
  dayjs.extend(relativeTime);
  
  const threadId = useSelector(selectThreadId);
  const threadName = useSelector(selectThreadName);
  const { t } = useTranslation();

  const [interlocutorList, setInterlocutorList] = useState([]);
  const [interlocutorStatus, setInterlocutorStatus] = useState(null);
  const [interlocutorLastOnline, setInterlocutorLastOnline] = useState(null);
  const [lastSeenText, setLastSeenText] = useState('');

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

    const updateLastOnline = (snapshot) => {
      const data = snapshot.val();
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
    };

    const onValueCallback = onValue(statusRef, updateLastOnline);

    return () => {
      onValueCallback();
    };
  }, [interlocutorList, interlocutorStatus]);

  useEffect(() => {
    const updateLastSeen = () => {
      setLastSeenText(`${t('last seen')} ${t(dayjs(new Date(interlocutorLastOnline).toString()).fromNow())}`);
    };

    if (interlocutorLastOnline === null) {
      setLastSeenText(t('loading...'));
    } else {
      updateLastSeen();
      var interval = setInterval(() => {
        updateLastSeen();
      }, 60000);
    }
    return () => clearInterval(interval);
  }, [interlocutorLastOnline, lastSeenText, t]);

  return (
    <div className='chat__header'>
      <div className='chat__info'>
        <Avatar src={interlocutorList[0]?.photo} />
        <div className='chat__user'>
          <h4 className='user__name'>{threadName}</h4>
          <p className='user__last-seen'>{interlocutorStatus === 'online' ? `${t('online')}` : `${lastSeenText}`}</p>
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
