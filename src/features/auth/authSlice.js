import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
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
      if (typeof window !== "undefined" && token) {
        try {
          localStorage.setItem("token", token);
        } catch {}
      }
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
