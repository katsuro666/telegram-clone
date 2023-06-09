import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
  },
  reducers: {
    login: (state: any, action: any) => {
      state.user = action.payload;
    },
    logout: (state: any) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser= (state: RootState) => state.user.user;

export default userSlice.reducer;