import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("user_token") || null,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("user_token", action.payload);
    },
    logout: (state) => {
      state.user = {};
      state.token = null;
      localStorage.removeItem("user_token");
    },
    getUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, logout, getUserInfo } = authSlice.actions;
export default authSlice.reducer;
