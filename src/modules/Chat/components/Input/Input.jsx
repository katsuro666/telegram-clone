import React, { useEffect, useState } from 'react'
import './Input.scss'
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { IconButton } from '@mui/material';
import { db } from '../../../../firebase';
import { serverTimestamp} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectThreadId, selectThreadName } from 'features/threadSlice';
import { selectUser } from 'features/userSlice';

export function Input() {

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const threadName = useSelector(selectThreadName)
  const threadId = useSelector(selectThreadId)
  const user = useSelector(selectUser)

  const sendMessage = async () => {
    
    console.log(input)

    db.collection('threads').doc(threadId).collection('messages').add({
      timestamp: serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    })
    
    setInput('')
  }
  
  const handleKeyDown = (e) => {
    e.key === 'Enter' && sendMessage()
  }

  return (
    <div className="input-outer">
      <div className='chat__input-container'>
        <div className="input__wrapper">
          <IconButton className='chat__additional-btn'>
            <SentimentSatisfiedAltIcon />
          </IconButton >
          <input 
            className='chat__input' 
            placeholder='Message' 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown} />
          <IconButton className='chat__additional-btn'>
            <AttachFileIcon />
          </IconButton>
        </div>
      </div>
        <IconButton className='chat__send-msg-btn' onClick={sendMessage}>
          <SendIcon />
        </IconButton>
    </div>
  )
}