import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { EditProfile, Header, Settings, Threads } from './components';
import { Thread } from './components/Threads/components';
import { db } from '../../firebase';
import { selectUser } from 'features/userSlice';
import './Sidebar.scss';
import { UserSearchItem } from './components/UserSearchItem';
import { selectIsEditProfileOpen, selectIsSettingsOpen, selectIsUserSearchOpen } from 'features/navSlice';

export function Sidebar() {
  const user = useSelector(selectUser);
  const [threads, setThreads] = useState([]);

  const [searchBarValue, setSearchBarValue] = useState('');

  const [searchList, setSearchList] = useState([]);
  const [filteredSearchList, setFilteredSearchList] = useState([]);

  const isUserSearchOpen = useSelector(selectIsUserSearchOpen);
  const isSettingsOpen = useSelector(selectIsSettingsOpen);
  const isEditProfileOpen = useSelector(selectIsEditProfileOpen);

  useEffect(() => {
    db.collection('rooms')
      .where('authorizedUsers', 'array-contains', user.uid)
      .orderBy('lastMessageIn', 'desc')
      .onSnapshot((snapshot) => {
        setThreads(
          snapshot.docs.map((doc) => ({
            chatWith: doc.data().authorizedUsers.find((uid) => uid !== user.uid),
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
      searchList.filter(
        (user) =>
          user.displayName.toLowerCase().includes(searchBarValue.toLowerCase()) ||
          user.username.includes(searchBarValue.toLowerCase())
      )
    );
  }, [searchBarValue, searchList]);

  const addThread = async () => {
    alert('temporarily removed method');
    // ! temporarily removed method
  };

  return (
    <div className='sidebar'>
      <Header searchBarValue={searchBarValue} setSearchBarValue={setSearchBarValue} />

      {isUserSearchOpen && (
        <Threads>
          {filteredSearchList.map(
            (item) => item.uid !== user.uid && <UserSearchItem key={item.uid} selectedUser={item} />
          )}
        </Threads>
      )}

      {isSettingsOpen && <Settings />}

      {isEditProfileOpen && <EditProfile />}

      {!isUserSearchOpen && !isSettingsOpen && !isEditProfileOpen && (
        <>
          <Threads>
            {threads.map((item) => (
              <Thread
                key={item.data.uniqueId}
                selectedUser={searchList.find((user) => user.uid === item.chatWith)}
                messageData={item.data}
              />
            ))}
          </Threads>
          <IconButton className='sidebar__new-msg' onClick={addThread}>
            <CreateIcon className='new-msg__icon' />
          </IconButton>
        </>
      )}
    </div>
  );
}
