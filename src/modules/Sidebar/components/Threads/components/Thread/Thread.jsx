import React from 'react'
import Avatar from '@mui/material/Avatar'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import './Thread.scss'

export function Thread(props) {
  let date = new Date().toTimeString().replace(/ .*/, '');

  return (
    <li className='thread'>
      <Avatar />
      <div className="thread__info">
        <div className="thread__top-row">
          <span className="thread__name">{props.threadName}</span>
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
    </li>
  )
}
