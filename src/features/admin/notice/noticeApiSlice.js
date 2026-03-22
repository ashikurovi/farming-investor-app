import { apiSlice } from "@/features/api/apiSlice";

export const noticeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search) {
          params.set("search", search);
        }

        return {
          url: `/notice?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map((item) => ({ type: "Notice", id: item.id })),
              { type: "Notice", id: "LIST" },
            ]
          : [{ type: "Notice", id: "LIST" }],
    }),

    createNotice: builder.mutation({
      query: (formData) => ({
        url: "/notice",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: [{ type: "Notice", id: "LIST" }],
    }),

    updateNotice: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/notice/${id}`,
        method: "PATCH",
        body: formData,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, { id }) => [
        { type: "Notice", id },
        { type: "Notice", id: "LIST" },
      ],
    }),

    deleteNotice: builder.mutation({
      query: (id) => ({
        url: `/notice/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Notice", id },
        { type: "Notice", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetNoticesQuery,
  useCreateNoticeMutation,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
} = noticeApiSlice;
