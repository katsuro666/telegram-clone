import React from 'react';
import { selectUser } from 'features/userSlice';
import { useSelector } from 'react-redux';
import './Message.scss';

export function Message({ data: { timestamp, message, uid } }) {
  const user = useSelector(selectUser);

  return (
    <div
      className={`message ${
        user.uid === uid ? 'message__from' : 'message__to'
      }`}>
      <div className='message__contents'>
        <p className='message__content'>{message}</p>
        <small className='message__timestamp'>
          {timestamp?.toDate().toLocaleTimeString('en-gb', {
            hour: 'numeric',
            minute: 'numeric',
          })}
        </small>
      </div>
    </div>
  );
}
