import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './app/store';
import { login, logout, selectUser } from './features/userSlice';
import { Telegram } from './modules/Telegram';
import { auth } from './firebase';
import { Login } from './modules/Login';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // ?????????????????????
        // TODO: REMOVE TYPESCRIPT ERROR
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          } as any)
        )
        // ?????????????????????
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])
  return (
    <div className="App">
      <Provider store={store}>
        {user ? <Telegram /> : <Login />}
      </Provider>
    </div>
  );
}

export default App;
