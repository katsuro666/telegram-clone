import React, { useEffect, useState } from 'react'
// import { selectThreadId } from 'features/threadSlice'
// import { useSelector } from 'react-redux'
import db from '../../../../firebase'
// import { Message } from '../Message'
import './Bubbles.scss'

export function Bubbles() {

  const [messages, setMessages] = useState([])
  // const threadId = useSelector(selectThreadId)


  // useEffect(() => {
  //   if (threadId) {
  //     db
  //     .collection('threads')
  //     .doc(threadId)
  //     .collection('messages')
  //     .orderBy('timestamp', 'desc')
  //     .onSnapshot((snapshot) => {
  //       setMessages(snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       })))
  //     })
  //   }
  // }, [threadId])

  return (
    <div className='chat__bubbles'>
      {/* { messages.map(({ id, data }) =>(
        <Message key = {id} id = {id} data = {data} />
        ))} */}
    </div>
  )
}
