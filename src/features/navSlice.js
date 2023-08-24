import { createSlice } from '@reduxjs/toolkit';

export const navSlice = createSlice({
  name: 'nav',
  initialState: {
    isSettingsOpen: false,
    isUserSearchOpen: false,
  },
  reducers: {
    setIsSettingsOpen: (state, action) => {
      state.isSettingsOpen = action.payload;
    },
    setIsUserSearchOpen: (state, action) => {
      state.isUserSearchOpen = action.payload;
    },
  },
});

export const { setIsSettingsOpen, setIsUserSearchOpen } = navSlice.actions;

export const selectIsSettingsOpen = (state) => state.nav.isSettingsOpen;
export const selectIsUserSearchOpen = (state) => state.nav.isUserSearchOpen;

export default navSlice.reducer;
