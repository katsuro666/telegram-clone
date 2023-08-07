import React, { useEffect, useState } from 'react'
import { selectThreadId } from 'features/threadSlice'
import { useSelector } from 'react-redux'
import { db } from '../../../../firebase'
import { Message } from '../Message'
import './Bubbles.scss'
import { selectUser } from 'features/userSlice'

export function Bubbles() {

  const [messages, setMessages] = useState([])
  const threadId = useSelector(selectThreadId)
  const user = useSelector(selectUser)

  useEffect(() => {
    if (threadId) {
      db
      .collection('users')
      .doc(user.uid)
      .collection('threads')
      .doc(threadId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })))
      })
    }
  }, [threadId])

  return (
    <div className={messages.length ? 'chat__bubbles --scrollable' : 'chat__bubbles'}>
      { messages.map(({ id, data }) =>(
        <Message key = {id} id = {id} data = {data} />
        ))}
    </div>
  )
}
