import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Telegram } from 'modules/Telegram';
import { Login } from 'modules/Login';
import { login, logout, selectUser } from 'features/userSlice';
import { auth, db } from './firebase';
import CircularProgress from '@mui/material/CircularProgress';
import './App.scss';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from 'app/hooks/useLocalStorage';
import i18next from 'i18next';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  // const {t} = useTranslation();
  // const [language, setLanguage] = useLocalStorage('language', 'ru')

  // const handleLanguageChange = () => {
  //   if (language === 'en') {
  //     i18next.changeLanguage('ru')
  //     setLanguage('ru')
  //   } else {
  //     i18next.changeLanguage('en')
  //     setLanguage('en')
  //   }
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection('users')
          .doc(authUser.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              dispatch(
                login({
                  uid: doc.data().uid,
                  photo: doc.data().photo,
                  email: doc.data().email,
                  displayName: doc.data().displayName,
                  username: doc.data().username,
                })
              );
              setIsUserLoaded(true);
            } else {
              const atSignPosition = authUser.email.indexOf('@');
              const username = authUser.email.slice(0, atSignPosition);

              db.collection('users').doc(authUser.uid).set({
                uid: authUser.uid,
                photo: authUser.photoURL,
                email: authUser.email,
                displayName: authUser.displayName,
                username: username,
              });

              dispatch(
                login({
                  uid: authUser.uid,
                  photo: authUser.photoURL,
                  email: authUser.email,
                  displayName: authUser.displayName,
                  username: username,
                })
              );
              setIsUserLoaded(true);
            }
          });
      } else {
        dispatch(logout());
        setIsUserLoaded(true);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className='App'>
      {!isUserLoaded ? (
        <div className='loading-screen'>
          <CircularProgress />
        </div>
      ) : (
        <>{user ? <Telegram /> : <Login />}</>
      )}
    </div>
  );
}

export default App;
