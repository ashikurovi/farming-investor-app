import { apiSlice } from "@/features/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search) {
          params.set("search", search);
        }

        return {
          url: `/users?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map((user) => ({ type: "User", id: user.id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    getUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    getUserInvestments: builder.query({
      query: ({ id, page = 1, limit = 10 } = {}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        return {
          url: `/users/${id}/investments?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    createUser: builder.mutation({
      query: (formData) => ({
        url: "/users",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    updateUser: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: formData,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    banUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/ban`,
        method: "PATCH",
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    unbanUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/unban`,
        method: "PATCH",
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    payoutUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/payout`,
        method: "POST",
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    getUserPayouts: builder.query({
      query: (id) => ({
        url: `/users/${id}/payouts`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result, error, id) => [{ type: "InvestorPayout", id }],
    }),

    getAllPayouts: builder.query({
      query: () => ({
        url: `/users/payouts/all`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
      providesTags: ["InvestorPayout", "User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetUserInvestmentsQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBanUserMutation,
  useUnbanUserMutation,
  usePayoutUserMutation,
  useGetUserPayoutsQuery,
  useGetAllPayoutsQuery,
} = usersApiSlice;
