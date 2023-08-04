import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import './Thread.scss'
import { useDispatch } from 'react-redux';
import { db } from '../../../../../../firebase';
import { setThread } from 'features/threadSlice';

export function Thread(props) {

  const dispatch = useDispatch();
  const [threadInfo, setThreadInfo] = useState([])

  useEffect(() => {
    db
    .collection('threads')
    .doc(props.id)
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => {
      setThreadInfo(snapshot.docs.map((doc) => doc.data()))
    })
  }, [props.id])

  return (
    <li 
    className='thread'
    onClick={() => 
      dispatch(
        setThread({
          threadId: props.id,
          threadName: props.threadName
        })
      )
      }>
      <Avatar src={props.photo} />
      <div className="thread__info">
        <div className="thread__top-row">
          <span className="thread__name">{props.threadName}</span>
          <div className="thread__indicators">
            {/* <DoneAllIcon className='thread__status' /> */}
            <small className="thread__date">{threadInfo[0]?.timestamp?.toDate().toLocaleString('en-gb', { hour: 'numeric', minute: 'numeric' })}</small>
          </div>
        </div>
        <div className="thread__bottom-row">
          <span className="thread__preview">{threadInfo[0]?.message}</span>
          {/* <div className="thread__unread-messages">5</div> */}
        </div>
      </div>
    </li>
  )
}
