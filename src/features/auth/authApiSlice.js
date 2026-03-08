import { apiSlice } from "../api/apiSlice";
import { setCredentials, logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const token =
            data?.data?.accessToken ??
            data?.data?.token ??
            data?.data?.jwt ??
            data?.token ??
            data?.accessToken ??
            null;

          if (token) {
            if (typeof window !== "undefined") {
              localStorage.setItem("token", token);
            }

            dispatch(
              setCredentials({
                token,
                user: data?.data?.user ?? data?.user ?? null,
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
        url: "/users/logout",
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
        url: "/users/me",
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
              user: data?.data ?? data ?? null,
            })
          );
        } catch (err) {
          console.error("Fetch me failed", err);
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/users/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/users/reset-password",
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

