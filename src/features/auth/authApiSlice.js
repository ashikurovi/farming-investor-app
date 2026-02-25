import { apiSlice } from "../api/apiSlice";
import { setCredentials, logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login", // adjust to your actual login URL
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const token = data?.token ?? data?.accessToken;

          if (token) {
            if (typeof window !== "undefined") {
              localStorage.setItem("token", token);
            }

            dispatch(
              setCredentials({
                token,
                user: data?.user ?? null,
              })
            );
          }
        } catch (err) {
          console.error("Login failed", err);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout", // adjust if your API uses a different route
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
          }
          dispatch(logOut());
        }
      },
    }),
    me: builder.query({
      query: () => ({
        url: "/auth/me", // adjust to your "current user" endpoint
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const state = getState();
          const existingToken = state?.auth?.token ?? null;

          dispatch(
            setCredentials({
              token: existingToken,
              user: data?.user ?? data ?? null,
            })
          );
        } catch (err) {
          console.error("Fetch me failed", err);
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgot-password", // adjust to your forgot password endpoint
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password", // adjust to your reset password endpoint
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;

