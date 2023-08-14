import React, { useEffect } from 'react';
import { Chat } from './Chat';
import { Sidebar } from './Sidebar';
import './Telegram.scss';
import { auth, realtimeDb } from '../firebase';
import { onDisconnect, onValue, ref, serverTimestamp, set } from 'firebase/database';

export function Telegram() {
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      const statusRef = ref(realtimeDb, `users/${user.uid}/status`);
      const lastOnlineRef = ref(realtimeDb, `users/${user.uid}/lastOnline`);
      const connectedRef = ref(realtimeDb, '.info/connected');

      if (authUser) {
        onValue(connectedRef, (snap) => {
          if (snap.val() === true) {
            set(statusRef, 'online');
            onDisconnect(statusRef).set('offline');
            onDisconnect(lastOnlineRef).set(serverTimestamp());
          }
        });
      } else {
        set(statusRef, 'offline');
        set(lastOnlineRef, serverTimestamp());
      }
    });

    return () => unsubscribe();
  }, [user.uid]);

  return (
    <div className='telegram'>
      <Sidebar />
      <Chat />
    </div>
  );
}
