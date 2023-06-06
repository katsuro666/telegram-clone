import React from 'react'
import { Chat } from './Chat'
import { Sidebar } from './Sidebar'
import './Telegram.scss'

export function Telegram() {
  return (
    <div className='telegram'>
      <Sidebar />
      <Chat />
    </div>
  )
}
