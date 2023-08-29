import { createSlice } from '@reduxjs/toolkit';

export const navSlice = createSlice({
  name: 'nav',
  initialState: {
    isSettingsOpen: false,
    isUserSearchOpen: false,
    isEditProfileOpen: false,
    isSelectLanguageOpen: false,
  },
  reducers: {
    setIsSettingsOpen: (state, action) => {
      state.isSettingsOpen = action.payload;
    },
    setIsUserSearchOpen: (state, action) => {
      state.isUserSearchOpen = action.payload;
    },
    setIsEditProfileOpen: (state, action) => {
      state.isEditProfileOpen = action.payload;
    },
    setIsSelectLanguageOpen: (state, action) => {
      state.isSelectLanguageOpen = action.payload;
    }
  },
});

export const { setIsSettingsOpen, setIsUserSearchOpen, setIsEditProfileOpen, setIsSelectLanguageOpen } = navSlice.actions;

export const selectIsSettingsOpen = (state) => state.nav.isSettingsOpen;
export const selectIsUserSearchOpen = (state) => state.nav.isUserSearchOpen;
export const selectIsEditProfileOpen = (state) => state.nav.isEditProfileOpen;
export const selectIsSelectLanguageOpen = (state) => state.nav.isSelectLanguageOpen;

export default navSlice.reducer;
