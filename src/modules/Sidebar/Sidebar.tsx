import React from 'react'
import './Sidebar.scss';
import { Header, Threads } from './components';
import CreateIcon from '@mui/icons-material/Create';

export function Sidebar() {
  return (
    <div className='sidebar'>
      <Header />
      <Threads />
      <div className="sidebar__new-msg">
        <CreateIcon className="new-msg__icon"/>
      </div>
    </div>
  )
}
