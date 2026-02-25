import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const initialState = {
  token: tokenFromStorage,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user || null;
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

