import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  token: null,
  role: null,
  isProfileCreated: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;  // This stores the role in Redux
      state.isProfileCreated = action.payload.isProfileCreated;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isProfileCreated = false;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;