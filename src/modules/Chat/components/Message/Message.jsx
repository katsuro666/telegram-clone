import React from 'react'
import { Avatar } from '@mui/material'
import { selectUser } from 'features/userSlice'
import { useSelector } from 'react-redux'
import './Message.scss'

export function Message({id, data: {timestamp, message, uid, photo, email, displayName}}) {
  const user = useSelector(selectUser)
  
  return (
    <div className={`message ${user.email === email && 'message__sender'}`}>
      {/* {user.email === email ? <Avatar src={user.photo} className='message__photo' /> : <Avatar src={photo} className='message__photo' />} */}
      {/* <Avatar src={photo}  /> */}
      <div className="message__contents">
        <p className='message__content'>{message}</p>
        <small className='message__timestamp'>{timestamp?.toDate().toLocaleTimeString('en-gb', { hour: 'numeric', minute: 'numeric' })}</small>
      </div>
    </div>
  )
}
