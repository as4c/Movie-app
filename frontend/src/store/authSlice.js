import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  userloading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.userloading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.userloading = false;
      console.log("action...", action.payload);
      localStorage.setItem("token", action.payload);
      state.isAuthenticated = true;
    },
    loginFailure(state, action) {
      state.userloading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
