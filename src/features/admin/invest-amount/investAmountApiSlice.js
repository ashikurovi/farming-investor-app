import { apiSlice } from "@/features/api/apiSlice";

export const investAmountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvestAmount: builder.query({
      query: () => ({
        url: "/investamount",
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
      providesTags: ["InvestAmount"],
    }),

    updateInvestAmount: builder.mutation({
      query: (body) => ({
        url: "/investamount",
        method: "PATCH",
        body,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: ["InvestAmount"],
    }),
  }),
});

export const {
  useGetInvestAmountQuery,
  useUpdateInvestAmountMutation,
} = investAmountApiSlice;
