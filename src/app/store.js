import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import threadReducer from '../features/threadSlice';
import themeReducer from '../features/themeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    thread: threadReducer,
    theme: themeReducer,
  },
});
