import React, { useState } from 'react'
import './Input.scss'
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { IconButton } from '@mui/material';

export  function Input() {

  const [message, setMessage] = useState('')

  const sendMessage = () => {
    console.log(message)
    
    // firebase stuff

    setMessage('')
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
            value={message} 
            onChange={e => setMessage(e.target.value)}
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
