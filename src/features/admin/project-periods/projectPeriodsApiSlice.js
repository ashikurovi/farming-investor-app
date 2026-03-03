import { apiSlice } from "@/features/api/apiSlice";

export const projectPeriodsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjectPeriods: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search) {
          params.set("search", search);
        }

        return {
          url: `/project-period?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map((period) => ({
                type: "ProjectPeriod",
                id: period.id,
              })),
              { type: "ProjectPeriod", id: "LIST" },
            ]
          : [{ type: "ProjectPeriod", id: "LIST" }],
    }),

    getProjectPeriod: builder.query({
      query: (id) => ({
        url: `/project-period/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result, error, id) => [{ type: "ProjectPeriod", id }],
    }),

    createProjectPeriod: builder.mutation({
      query: (payload) => ({
        url: "/project-period",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: [{ type: "ProjectPeriod", id: "LIST" }],
    }),

    updateProjectPeriod: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/project-period/${id}`,
        method: "PATCH",
        body: payload,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, { id }) => [
        { type: "ProjectPeriod", id },
        { type: "ProjectPeriod", id: "LIST" },
      ],
    }),

    deleteProjectPeriod: builder.mutation({
      query: (id) => ({
        url: `/project-period/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ProjectPeriod", id },
        { type: "ProjectPeriod", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProjectPeriodsQuery,
  useGetProjectPeriodQuery,
  useCreateProjectPeriodMutation,
  useUpdateProjectPeriodMutation,
  useDeleteProjectPeriodMutation,
} = projectPeriodsApiSlice;

