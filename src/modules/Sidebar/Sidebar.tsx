import React, { useEffect, useState } from 'react'
import './Sidebar.scss';
import { Header, Threads } from './components';
import CreateIcon from '@mui/icons-material/Create';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from 'features/userSlice';
import db from '../../firebase';
import { addDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { Thread } from './components/Threads/components';

export function Sidebar() {

  const user = useSelector(selectUser)
  const [threads, setThreads] = useState<any[]>([])

  

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'threads'), (snapshot: any) => {
      setThreads(snapshot.docs.map((doc: any) => ({
        id: doc.id,
        data: doc.data(),
      })))
    })

  }, [])

  const addThread = async () => {
    const threadName = prompt('Enter thread name.')
    if (threadName) {
      const docRef = await addDoc(collection(db, "threads"), {
        threadName: threadName,
      });
      console.log("Document written: ", threadName);
    }
  }

  // const querySnapshot = getDocs(collection(db, 'threads'))
  // querySnapshot.then((snapshot) => {
  //   snapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data().threadName}`);
  //   })
  // })

  return (
    <div className='sidebar'>
      <Header />
      <Threads > 
        {threads.map(item => (
          <Thread key={item.id} threadName={item.data.threadName} />
        ))}
      </Threads>
      <IconButton className="sidebar__new-msg" onClick={addThread}>
        <CreateIcon className="new-msg__icon"/>
      </IconButton>
    </div>
  )
}
