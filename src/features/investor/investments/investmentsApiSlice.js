import { apiSlice } from "@/features/api/apiSlice";

export const investmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvestments: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        projectId,
        userId,
      } = {}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search) {
          params.set("search", search);
        }
        if (projectId != null && projectId !== "") {
          params.set("projectId", String(projectId));
        }
        if (userId != null && userId !== "") {
          params.set("userId", String(userId));
        }

        return {
          url: `/investments?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map((investment) => ({
                type: "Investment",
                id: investment.id,
              })),
              { type: "Investment", id: "LIST" },
            ]
          : [{ type: "Investment", id: "LIST" }],
    }),

    getMyInvestments: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search) {
          params.set("search", search);
        }

        const queryString = params.toString();

        return {
          url: queryString ? `/investments/my?${queryString}` : "/investments/my",
          method: "GET",
        };
      },
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map((investment) => ({
                type: "Investment",
                id: investment.id,
              })),
              { type: "Investment", id: "MY_LIST" },
            ]
          : [{ type: "Investment", id: "MY_LIST" }],
    }),

    getInvestmentsStats: builder.query({
      query: () => ({
        url: "/investments/stats",
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
      providesTags: () => [{ type: "Investment", id: "STATS" }],
    }),

    getInvestment: builder.query({
      query: (id) => ({
        url: `/investments/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result, error, id) => [{ type: "Investment", id }],
    }),

    updateInvestment: builder.mutation({
      query: ({ id, amount }) => ({
        url: `/investments/${id}`,
        method: "PATCH",
        body: { amount },
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, { id }) => [
        { type: "Investment", id },
        { type: "Investment", id: "LIST" },
        { type: "Investment", id: "STATS" },
      ],
    }),

    createInvestment: builder.mutation({
      query: ({ userId, projectId, amount }) => ({
        url: "/investments",
        method: "POST",
        body: { userId, projectId, amount },
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Investment", id: "LIST" },
        { type: "Investment", id: "STATS" },
        ...(projectId
          ? [
              { type: "Project", id: projectId },
              { type: "Project", id: "LIST" },
            ]
          : []),
      ],
    }),

    deleteInvestment: builder.mutation({
      query: (id) => ({
        url: `/investments/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, id) => [
        { type: "Investment", id },
        { type: "Investment", id: "LIST" },
        { type: "Investment", id: "STATS" },
      ],
    }),
  }),
});

export const {
  useGetInvestmentsQuery,
  useGetMyInvestmentsQuery,
  useGetInvestmentsStatsQuery,
  useGetInvestmentQuery,
  useCreateInvestmentMutation,
  useUpdateInvestmentMutation,
  useDeleteInvestmentMutation,
} = investmentsApiSlice;

