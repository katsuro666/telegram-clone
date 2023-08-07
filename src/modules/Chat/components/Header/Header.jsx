import React, { useEffect, useState } from 'react'
import CallIcon from '@mui/icons-material/Call'
import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Avatar, IconButton } from '@mui/material'
import './Header.scss'
import { selectThreadId, selectThreadName } from 'features/threadSlice'
import { useSelector } from 'react-redux'
import { selectUser } from 'features/userSlice'
import * as timeago from 'timeago.js'
import { db } from '../../../../firebase'

export function Header() {

  const threadId = useSelector(selectThreadId)
  const threadName = useSelector(selectThreadName)
  const user = useSelector(selectUser)
  const [threadInfo, setThreadInfo] = useState([])

  useEffect(() => {
    db
    .collection('threads')
    .doc(threadId)
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => {
      setThreadInfo(snapshot.docs.map((doc) => doc.data()))
    })
  }, [threadId])

  // TODO add threadname avatar
  
  return (
    <div className='chat__header'>
      <div className="chat__info">
        {/* {threadId ? <Avatar src={user.photo} /> : ''} */}
        <Avatar />
        <div className="chat__user">
          <h4 className="user__name">{threadName}</h4>
          <p className="user__last-seen">last seen {timeago.format(threadInfo[0]?.timestamp?.toDate().toLocaleString('en'))}</p>
        </div>
      </div>
      <div className="chat__utils">
        <IconButton className="utils__icon">
          <CallIcon />
        </IconButton>
        <IconButton className="utils__icon">
          <SearchIcon />
        </IconButton>
        <IconButton className="utils__icon">
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  )
}
