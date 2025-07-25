// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth.Slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
