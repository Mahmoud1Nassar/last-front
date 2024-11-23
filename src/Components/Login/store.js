import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Path to your slice
const store = configureStore({
  reducer: {
    auth: authReducer, // Use the reducer from your authSlice
  },
});
export default store;