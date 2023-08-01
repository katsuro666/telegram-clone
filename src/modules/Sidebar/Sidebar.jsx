import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';

import { Header } from './components'
import { Threads } from './components/Threads';
import { Thread } from './components/Threads/components';
import './Sidebar.scss';


export function Sidebar() {

  const [threads, setThreads] = useState([])

  const addThread = async () => {
    console.log('add thread')
  }
  
  return (
    <div className='sidebar'>
      <Header />
      <Threads > 
        {threads.map(item => (
          <Thread key={item.id} threadName={item.data.threadName} />
        ))}
        <Thread key={1} threadName={'test'} />
      </Threads>
      <IconButton className="sidebar__new-msg" onClick={addThread}>
        <CreateIcon className="new-msg__icon"/>
      </IconButton>
    </div>
  )
}
