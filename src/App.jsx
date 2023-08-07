import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Telegram } from 'modules/Telegram';
import { Login } from 'modules/Login';
import { login, logout, selectUser } from 'features/userSlice';
import { auth } from './firebase';
import CircularProgress from '@mui/material/CircularProgress';
import './App.scss';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isUserLoaded, setIsUserLoaded] = useState(false)
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        )
      } else {
        dispatch(logout())
      }
      setIsUserLoaded(true)
    })

    return () => unsubscribe();
  }, [dispatch])

  return (
    <div className="App">
      {!isUserLoaded ? (
        <div className="loading-screen">
          <CircularProgress />
        </div>
      ) : (
        <>
          {user ? <Telegram /> : <Login />}
        </>
      )}
    </div>
  );
}

export default App;
