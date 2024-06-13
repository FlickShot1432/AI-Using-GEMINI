import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isLogged: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state, action) => {
      state = initialState;
    },
  },
});

export const { handleLogout } = authSlice.actions;

export default authSlice.reducer;
