import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import { Header } from './components'
import { Threads } from './components/Threads';
import { Thread } from './components/Threads/components';
import { db } from '../../firebase';
import { selectUser } from 'features/userSlice';
import './Sidebar.scss';


export function Sidebar() {

  const user = useSelector(selectUser)
  const [threads, setThreads] = useState([])

  useEffect(() => {
    db.collection('threads').onSnapshot((snapshot) => {
      setThreads(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      })))
    })
  })

  const addThread = async () => {
    const threadName = prompt('Enter a thread name')
    if (threadName) {
      db.collection('threads').add({
        threadName: threadName
      })
    }
  }
  
  return (
    <div className='sidebar'>
      <Header />
      <Threads > 
        {threads.map(item => (
          <Thread key={item.id} id={item.id} threadName={item.data.threadName} photo={item.data.photo} />
        ))}
      </Threads>
      <IconButton className="sidebar__new-msg" onClick={addThread}>
        <CreateIcon className="new-msg__icon"/>
      </IconButton>
    </div>
  )
}
