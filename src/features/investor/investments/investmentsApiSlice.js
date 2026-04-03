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
              ...result.items.map((item) => ({ type: "Investment", id: item.id })),
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
              ...result.items.map((item) => ({ type: "Investment", id: item.id })),
              { type: "Investment", id: "LIST" },
            ]
          : [{ type: "Investment", id: "LIST" }],
    }),

    getInvestmentsStats: builder.query({
      query: () => ({
        url: "/investments/stats",
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
      providesTags: [{ type: "Investment", id: "STATS" }],
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
      invalidatesTags: [{ type: "Investment", id: "LIST" }, { type: "Investment", id: "STATS" }],
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

    getInvestmentsAdmin: builder.query({
      query: () => ({
        url: "/investment",
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
      providesTags: [{ type: "Investment", id: "LIST" }],
    }),
    getRecentInvestments: builder.query({
      query: ({ limit = 5 } = {}) => ({
        url: `/investment/recent`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
      providesTags: [{ type: "Investment", id: "RECENT" }],
    }),

    getInvestmentAdmin: builder.query({
      query: (id) => ({
        url: `/investment/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result, error, id) => [{ type: "Investment", id }],
    }),

    createInvestmentAdmin: builder.mutation({
      query: ({
        investorId,
        amount,
        reference,
        photoFile,
        date,
        time,
        startDate,
        endDate,
      }) => {
        const hasFile =
          typeof FormData !== "undefined" && photoFile instanceof File;
        if (hasFile) {
          const form = new FormData();
          form.append("investorId", String(investorId));
          form.append("amount", String(amount));
          form.append("date", date);
          form.append("time", time);
          if (startDate) form.append("startDate", startDate);
          if (endDate) form.append("endDate", endDate);
          if (reference) form.append("reference", reference);
          form.append("photo", photoFile);
          return {
            url: "/investment",
            method: "POST",
            body: form,
          };
        }
        return {
          url: "/investment",
          method: "POST",
          body: { investorId, amount, reference, date, time, startDate, endDate },
        };
      },
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: [{ type: "Investment", id: "LIST" }, { type: "Investment", id: "STATS" }, { type: "Investment", id: "RECENT" }],
    }),

    updateInvestmentAdmin: builder.mutation({
      query: ({ id, amount, reference, photoFile, date, time, startDate, endDate }) => {
        const hasFile = typeof FormData !== "undefined" && photoFile instanceof File;
        if (hasFile) {
          const form = new FormData();
          if (amount != null) form.append("amount", String(amount));
          if (reference) form.append("reference", reference);
          if (date) form.append("date", date);
          if (time) form.append("time", time);
          if (startDate) form.append("startDate", startDate);
          if (endDate) form.append("endDate", endDate);
          form.append("photo", photoFile);
          return {
            url: `/investment/${id}`,
            method: "PATCH",
            body: form,
          };
        }
        return {
          url: `/investment/${id}`,
          method: "PATCH",
          body: { amount, reference, date, time, startDate, endDate },
        };
      },
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, arg) => [
        { type: "Investment", id: arg.id },
        { type: "Investment", id: "LIST" },
        { type: "Investment", id: "STATS" },
        { type: "Investment", id: "RECENT" },
      ],
    }),

    deleteInvestmentAdmin: builder.mutation({
      query: (id) => ({
        url: `/investment/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, id) => [
        { type: "Investment", id },
        { type: "Investment", id: "LIST" },
        { type: "Investment", id: "STATS" },
        { type: "Investment", id: "RECENT" },
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
  useGetInvestmentsAdminQuery,
  useGetInvestmentAdminQuery,
  useCreateInvestmentAdminMutation,
  useUpdateInvestmentAdminMutation,
  useDeleteInvestmentAdminMutation,
  useGetRecentInvestmentsQuery,
} = investmentsApiSlice;
