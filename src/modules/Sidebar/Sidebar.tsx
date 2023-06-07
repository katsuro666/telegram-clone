import React from 'react'
import './Sidebar.scss';
import { Header, Threads } from './components';
import CreateIcon from '@mui/icons-material/Create';
import { IconButton } from '@mui/material';

export function Sidebar() {
  return (
    <div className='sidebar'>
      <Header />
      <Threads />
      <IconButton className="sidebar__new-msg">
        <CreateIcon className="new-msg__icon"/>
      </IconButton>
    </div>
  )
}
