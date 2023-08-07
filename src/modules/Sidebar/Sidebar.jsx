import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { Header } from './components';
import { Threads } from './components/Threads';
import { Thread } from './components/Threads/components';
import { db } from '../../firebase';
import { selectUser } from 'features/userSlice';
import './Sidebar.scss';

export function Sidebar() {
  const user = useSelector(selectUser);
  const [threads, setThreads] = useState([]);
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  useEffect(() => {
    db.collection('users')
      .doc(user.uid)
      .collection('threads')
      .onSnapshot((snapshot) => {
        setThreads(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  });

  const addThread = async () => {
    const threadName = prompt('Enter a thread name');
    // alert(threadName);

    // TODO: remove this method to the Sidebar search input

    // if (threadName) {
    //   db.collection('users').doc(user.uid).collection('threads').add({
    //     threadName: threadName
    //   })
    // }
  };

  return (
    <div className='sidebar'>
      <Header searchIsOpen={searchIsOpen} setSearchIsOpen={setSearchIsOpen} />
      {searchIsOpen ? (
        <Threads>
          <h1>ka</h1>
          <h1>ka</h1>
        </Threads>
      ) : (
        <Threads>
          {threads.map((item) => (
            <Thread
              key={item.id}
              id={item.id}
              threadName={item.data.threadName}
              photo={item.data.photo}
            />
          ))}
        </Threads>
      )}
      {!searchIsOpen && (
        <IconButton className='sidebar__new-msg' onClick={addThread}>
          <CreateIcon className='new-msg__icon' />
        </IconButton>
      )}
    </div>
  );
}
