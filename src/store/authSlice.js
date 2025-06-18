import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.status = false;
      state.user = null;
      state.loading = false;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { login, logout, finishLoading } = authSlice.actions;

export default authSlice.reducer;
