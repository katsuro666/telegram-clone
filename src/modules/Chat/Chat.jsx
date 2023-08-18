import React from 'react'
import { useSelector } from 'react-redux'
import { selectThreadId } from 'features/threadSlice'
import './Chat.scss'
import { Bubbles, Header, Input } from './components'

export function Chat() {
  const threadId = useSelector(selectThreadId)
  
  return (
    <div className='chat--gradient'>
      <div className="chat--canvas"></div>
      <div className="chat">
        {threadId && (
          <>
            <Header />
            <div className="chat__container">
              <Bubbles />
              <Input />
            </div>
          </>
        )}
      </div>
    </div>
  )
}