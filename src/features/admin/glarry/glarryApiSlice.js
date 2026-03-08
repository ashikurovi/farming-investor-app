import { apiSlice } from "@/features/api/apiSlice";

export const glarryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGlarry: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search) {
          params.set("search", search);
        }

        return {
          url: `/glarry?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map((item) => ({ type: "Glarry", id: item.id })),
              { type: "Glarry", id: "LIST" },
            ]
          : [{ type: "Glarry", id: "LIST" }],
    }),

    createGlarry: builder.mutation({
      query: (formData) => ({
        url: "/glarry",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: [{ type: "Glarry", id: "LIST" }],
    }),

    updateGlarry: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/glarry/${id}`,
        method: "PATCH",
        body: formData,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, { id }) => [
        { type: "Glarry", id },
        { type: "Glarry", id: "LIST" },
      ],
    }),

    deleteGlarry: builder.mutation({
      query: (id) => ({
        url: `/glarry/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Glarry", id },
        { type: "Glarry", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetGlarryQuery,
  useCreateGlarryMutation,
  useUpdateGlarryMutation,
  useDeleteGlarryMutation,
} = glarryApiSlice;

