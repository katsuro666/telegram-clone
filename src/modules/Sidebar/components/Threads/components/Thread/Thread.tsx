import React from 'react'
import Avatar from '@mui/material/Avatar'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import './Thread.scss'

export function Thread() {
  let date = new Date().toTimeString().replace(/ .*/, '');

  return (
    <div className='thread'>
      <Avatar />
      <div className="thread__info">
        <div className="thread__top-row">
          <div className="thread__name">Name</div>
          <div className="thread__indicators">
          <DoneAllIcon className='thread__status' />
          <span className="thread__date">{date}</span>
          </div>
        </div>
        <div className="thread__bottom-row">
          <span className="thread__preview">Text preview</span>
          <div className="thread__unread-messages">5</div>
        </div>
      </div>
    </div>
  )
}
