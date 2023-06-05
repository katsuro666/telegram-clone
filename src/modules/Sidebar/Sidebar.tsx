import React from 'react'
import './Sidebar.scss';
import { Header, Threads } from './components';

export function Sidebar() {
  return (
    <div className='sidebar'>
      <Header />
      <Threads />
      <div className="sidebar__newMsg"></div>
    </div>
  )
}
