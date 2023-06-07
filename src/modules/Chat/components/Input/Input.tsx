import React from 'react'
import './Input.scss'
// import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { IconButton } from '@mui/material';

export  function Input() {
  return (
    <div className="input-outer">
      <div className='chat__input-container'>
        <div className="input__wrapper">
          <IconButton className='chat__additional-btn'>
            <SentimentSatisfiedAltIcon />
          </IconButton >
          <input className='chat__input' placeholder='Message' type="text" />
          <IconButton className='chat__additional-btn'>
            <AttachFileIcon />
          </IconButton>
        </div>
      </div>
        <IconButton className='chat__send-msg-btn'>
          <SendIcon />
        </IconButton>
    </div>
  )
}
