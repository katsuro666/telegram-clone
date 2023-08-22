import React, { useEffect, useState } from 'react';
import { selectThreadId } from 'features/threadSlice';
import { useSelector } from 'react-redux';
import { db } from '../../../../firebase';
import { Message } from '../Message';
import './Bubbles.scss';

export function Bubbles() {
  const [messages, setMessages] = useState([]);
  const threadId = useSelector(selectThreadId);

  useEffect(() => {
    if (threadId) {
      db.collection('rooms')
        .doc(threadId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [threadId]);

  const isPrevMessageHasSameDay = (array, index) => {
    if (index === 0) {
      return true;
    } else if (
      array[index]?.data?.timestamp?.toDate().toLocaleDateString('en', { month: 'long', day: 'numeric' }) ===
      array[index + 1]?.data?.timestamp?.toDate().toLocaleDateString('en', { month: 'long', day: 'numeric' })
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={messages.length ? 'chat__bubbles --scrollable' : 'chat__bubbles'}>
      {messages.map(({ id, data }, index) => {
        if (index === messages.length - 1) {
          return (
            <React.Fragment key={id}>
              <Message data={data} />
              <div className='service-msg'>
                {messages[index]?.data?.timestamp?.toDate().toLocaleDateString('en', { month: 'long', day: 'numeric' })}
              </div>
            </React.Fragment>
          );
        } else if (isPrevMessageHasSameDay(messages, index)) {
          return <Message key={id} data={data} />;
        } else {
          return (
            <React.Fragment key={id}>
              <Message data={data} />
              <div className='service-msg'>
                {messages[index - 1]?.data?.timestamp
                  ?.toDate()
                  .toLocaleDateString('en', { month: 'long', day: 'numeric' })}
              </div>
            </React.Fragment>
          );
        }
      })}
    </div>
  );
}
