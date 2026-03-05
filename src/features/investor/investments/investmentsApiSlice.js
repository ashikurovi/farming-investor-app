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
    }),

    getInvestmentsStats: builder.query({
      query: () => ({
        url: "/investments/stats",
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    getInvestment: builder.query({
      query: (id) => ({
        url: `/investments/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    updateInvestment: builder.mutation({
      query: ({ id, amount }) => ({
        url: `/investments/${id}`,
        method: "PATCH",
        body: { amount },
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    createInvestment: builder.mutation({
      query: ({ userId, projectId, amount }) => ({
        url: "/investments",
        method: "POST",
        body: { userId, projectId, amount },
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    deleteInvestment: builder.mutation({
      query: (id) => ({
        url: `/investments/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    getInvestmentsAdmin: builder.query({
      query: () => ({
        url: "/investment",
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
    }),
    getRecentInvestments: builder.query({
      query: ({ limit = 5 } = {}) => ({
        url: `/investment/recent`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    getInvestmentAdmin: builder.query({
      query: (id) => ({
        url: `/investment/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    createInvestmentAdmin: builder.mutation({
      query: ({ investorId, amount, reference, photoFile, date, time }) => {
        const hasFile = typeof FormData !== "undefined" && photoFile instanceof File;
        if (hasFile) {
          const form = new FormData();
          form.append("investorId", String(investorId));
          form.append("amount", String(amount));
          form.append("date", date);
          form.append("time", time);
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
          body: { investorId, amount, reference, date, time },
        };
      },
      transformResponse: (response) => response?.data ?? response,
    }),

    updateInvestmentAdmin: builder.mutation({
      query: ({ id, amount, reference, photoFile, date, time }) => {
        const hasFile = typeof FormData !== "undefined" && photoFile instanceof File;
        if (hasFile) {
          const form = new FormData();
          if (amount != null) form.append("amount", String(amount));
          if (reference) form.append("reference", reference);
          if (date) form.append("date", date);
          if (time) form.append("time", time);
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
          body: { amount, reference, date, time },
        };
      },
      transformResponse: (response) => response?.data ?? response,
    }),

    deleteInvestmentAdmin: builder.mutation({
      query: (id) => ({
        url: `/investment/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response?.data ?? response,
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
