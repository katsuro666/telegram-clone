import React from 'react'
import { IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';

import { Header } from './components'


export function Sidebar() {

  const addThread = async () => {
    console.log('add thread')
  }
  
  return (
    <div className='sidebar'>
      <Header />
      {/* <Threads > 
        {threads.map(item => (
          <Thread key={item.id} threadName={item.data.threadName} />
        ))}
      </Threads> */}
      <IconButton className="sidebar__new-msg" onClick={addThread}>
        <CreateIcon className="new-msg__icon"/>
      </IconButton>
    </div>
  )
}
