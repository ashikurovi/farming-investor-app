import { apiSlice } from "@/features/api/apiSlice";

export const dailyReportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDailyReport: builder.mutation({
      query: ({ payload, projectId }) => {
        const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;
        return {
          url: "/daily-report",
          method: "POST",
          body: payload,
        };
      },
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, { projectId }) =>
        projectId ? [{ type: "Project", id: projectId }] : [],
    }),
    getDailyReports: builder.query({
      query: () => ({
        url: "/daily-report",
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
    }),
    getDailyReport: builder.query({
      query: (id) => ({
        url: `/daily-report/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
    }),
  }),
});

export const {
  useCreateDailyReportMutation,
  useGetDailyReportsQuery,
  useGetDailyReportQuery,
} = dailyReportApiSlice;
