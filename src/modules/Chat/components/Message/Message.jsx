import React from 'react';
import { selectUser } from 'features/userSlice';
import { useSelector } from 'react-redux';
import './Message.scss';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export function Message({ data: { timestamp, message, uid, seen } }) {
  const user = useSelector(selectUser);
  const yourMessage = user.uid === uid;

  return (
    <div className={`message ${yourMessage ? 'message__from' : 'message__to'}`}>
      <div className={`message__contents ${yourMessage ? 'message__contents--from' : 'message__contents--to'}`}>
        <p className='message__content'>{message}</p>
        <div className='message__info'>
          <small className='message__timestamp'>
            {timestamp?.toDate().toLocaleTimeString('en-gb', {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </small>
          {yourMessage &&
            (seen ? <DoneAllIcon className='message__status' /> : <DoneIcon className='message__status' />)}
        </div>
      </div>
    </div>
  );
}
