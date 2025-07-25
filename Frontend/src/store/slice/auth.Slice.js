// src/redux/slice/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userInfo = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: userInfo || null,
  isAuthenticated: !!userInfo,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload)); // ✅ persist
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user'); // ✅ clear
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
