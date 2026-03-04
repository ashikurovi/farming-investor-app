import { apiSlice } from "@/features/api/apiSlice";

export const investorTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvestorTypes: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search) {
          params.set("search", search);
        }

        return {
          url: `/investor-types?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map((item) => ({
                type: "InvestorType",
                id: item.id,
              })),
              { type: "InvestorType", id: "LIST" },
            ]
          : [{ type: "InvestorType", id: "LIST" }],
    }),

    createInvestorType: builder.mutation({
      query: (body) => ({
        url: "/investor-types",
        method: "POST",
        body,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: [{ type: "InvestorType", id: "LIST" }],
    }),

    updateInvestorType: builder.mutation({
      query: ({ id, body }) => ({
        url: `/investor-types/${id}`,
        method: "PATCH",
        body,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, { id }) => [
        { type: "InvestorType", id },
        { type: "InvestorType", id: "LIST" },
      ],
    }),

    deleteInvestorType: builder.mutation({
      query: (id) => ({
        url: `/investor-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "InvestorType", id },
        { type: "InvestorType", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetInvestorTypesQuery,
  useCreateInvestorTypeMutation,
  useUpdateInvestorTypeMutation,
  useDeleteInvestorTypeMutation,
} = investorTypeApiSlice;

