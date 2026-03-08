import { apiSlice } from "@/features/api/apiSlice";

export const bannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search) {
          params.set("search", search);
        }

        return {
          url: `/banner?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map((item) => ({ type: "Banner", id: item.id })),
              { type: "Banner", id: "LIST" },
            ]
          : [{ type: "Banner", id: "LIST" }],
    }),

    createBanner: builder.mutation({
      query: (formData) => ({
        url: "/banner",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: [{ type: "Banner", id: "LIST" }],
    }),

    updateBanner: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/banner/${id}`,
        method: "PATCH",
        body: formData,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, { id }) => [
        { type: "Banner", id },
        { type: "Banner", id: "LIST" },
      ],
    }),

    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Banner", id },
        { type: "Banner", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApiSlice;

