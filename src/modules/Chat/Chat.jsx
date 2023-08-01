import React from 'react'
import './Chat.scss'
import { Bubbles, Header, Input } from './components'

export function Chat() {
  return (
    <div className='chat--gradient'>
      <div className="chat">
        <Header />
        <div className="chat__container">
          <Bubbles />
          <Input />
        </div>
      </div>
    </div>
  )
}
