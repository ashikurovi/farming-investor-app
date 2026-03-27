import { apiSlice } from "@/features/api/apiSlice";

export const deedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDeeds: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search) {
          params.set("search", search);
        }

        return {
          url: `/deed?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result) =>
        result?.data || result?.items
          ? [
              ...(result?.data || result?.items).map((item) => ({ type: "Deed", id: item.id })),
              { type: "Deed", id: "LIST" },
            ]
          : [{ type: "Deed", id: "LIST" }],
    }),

    createDeed: builder.mutation({
      query: (formData) => ({
        url: "/deed",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: [{ type: "Deed", id: "LIST" }],
    }),

    updateDeed: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/deed/${id}`,
        method: "PATCH",
        body: formData,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, { id }) => [
        { type: "Deed", id },
        { type: "Deed", id: "LIST" },
      ],
    }),

    deleteDeed: builder.mutation({
      query: (id) => ({
        url: `/deed/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Deed", id },
        { type: "Deed", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetDeedsQuery,
  useCreateDeedMutation,
  useUpdateDeedMutation,
  useDeleteDeedMutation,
} = deedApiSlice;
