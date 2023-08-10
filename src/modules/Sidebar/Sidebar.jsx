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
import { UserSearchItem } from './components/UserSearchItem';

export function Sidebar() {
  const user = useSelector(selectUser);
  const [threads, setThreads] = useState([]);

  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState('');

  const [searchList, setSearchList] = useState([]);
  const [filteredSearchList, setFilteredSearchList] = useState([]);

  useEffect(() => {
    db.collection('rooms')
      .where('authorizedUsers', 'array-contains', user.uid)
      .onSnapshot((snapshot) => {
        setThreads(
          snapshot.docs.map((doc) => ({
            chatWith: doc
              .data()
              .authorizedUsers.find((uid) => uid !== user.uid),
            data: doc.data(),
          }))
        );
      });
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection('users').orderBy('displayName').get();
      setSearchList(
        data.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredSearchList(
      searchList.filter((user) =>
        user.displayName.toLowerCase().includes(searchBarValue.toLowerCase())
      )
    );
  }, [searchBarValue, searchList]);

  const addThread = async () => {
    alert('temporarily removed method');
    // ! temporarily removed method
    // const threadName = prompt('Enter a thread name');
    // if (threadName) {
    //   db.collection('users').doc(user.uid).collection('threads').add({
    //     threadName: threadName
    //   })
    // }
  };

  return (
    <div className='sidebar'>
      <Header
        searchIsOpen={searchIsOpen}
        setSearchIsOpen={setSearchIsOpen}
        searchBarValue={searchBarValue}
        setSearchBarValue={setSearchBarValue}
      />
      {searchIsOpen ? (
        <Threads>
          {filteredSearchList.map(
            (item) =>
              item.uid !== user.uid && (
                <UserSearchItem
                  key={item.uid}
                  selectedUser={item}
                  setSearchIsOpen={setSearchIsOpen}
                />
              )
          )}
        </Threads>
      ) : (
        <Threads>
          {threads.map((item) => (
            <Thread
              key={item.data.id}
              selectedUser={searchList.find(
                (user) => user.uid === item.chatWith
              )}
              messageData={item.data}
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
