import React from 'react'
import { Avatar } from '@mui/material'
import { selectUser } from 'features/userSlice'
import { useSelector } from 'react-redux'
import * as timeago from 'timeago.js'

export function Message({id, data: {timestamp, message, uid, photo, email, displayName}}) {
  const user = useSelector(selectUser)
  
  return (
    <div className={`message ${user.email === email && 'message__sender'}`}>
      <Avatar src={photo} className='message__photo' />
      <div className="message__contents">
        <p>{message}</p>
        <small>{timeago.format(new Date(timestamp?.toDate()))}</small>
      </div>
    </div>
  )
}
