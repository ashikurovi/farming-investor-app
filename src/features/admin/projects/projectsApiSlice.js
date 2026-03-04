import { apiSlice } from "@/features/api/apiSlice";

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search) {
          params.set("search", search);
        }

        return {
          url: `/projects?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response?.data ?? response,
    }),

    getProjectsStats: builder.query({
      query: () => ({
        url: "/projects/stats",
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    getProjectStats: builder.query({
      query: (id) => ({
        url: `/projects/${id}/stats`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    getProject: builder.query({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    getProjectInvestmentInfo: builder.query({
      query: (id) => ({
        url: `/projects/${id}/investment-info`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    getProjectInvestors: builder.query({
      query: ({ id, page = 1, limit = 10 } = {}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));

        return {
          url: `/investments/project/${id}/investors?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result, error, { id }) => [{ type: "Project", id }],
    }),

    createProject: builder.mutation({
      query: (payload) => ({
        url: "/projects",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    updateProject: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: payload,
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: undefined,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectsStatsQuery,
  useGetProjectQuery,
  useGetProjectStatsQuery,
  useGetProjectInvestmentInfoQuery,
  useGetProjectInvestorsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApiSlice;

