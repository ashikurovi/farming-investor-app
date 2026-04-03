import { apiSlice } from "../api/apiSlice";

export const partnerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPartners: builder.query({
      query: () => "/partner",
      providesTags: ["User"],
    }),
    getPartnerById: builder.query({
      query: (id) => `/partner/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    addPartner: builder.mutation({
      query: (data) => ({
        url: "/partner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    addInvestment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/partner/${id}/invest`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }, "User"],
    }),
    distributeCommission: builder.mutation({
      query: (data) => ({
        url: "/partner/commission/distribute",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Partners"],
    }),
    withdrawPartnerProfit: builder.mutation({
      query: ({ id, data }) => ({
        url: `/partner/${id}/withdraw-profit`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Partners"],
    }),
    getPartnerPayouts: builder.query({
      query: (id) => `/partner/${id}/payouts`,
      providesTags: ["Partners"],
    }),
    getAllPartnerPayouts: builder.query({
      query: () => `/partner/payouts`,
      providesTags: ["Partners"],
    }),
  }),
});

export const {
  useGetPartnersQuery,
  useGetPartnerByIdQuery,
  useAddPartnerMutation,
  useAddInvestmentMutation,
  useDistributeCommissionMutation,
  useWithdrawPartnerProfitMutation,
  useGetPartnerPayoutsQuery,
  useGetAllPartnerPayoutsQuery,
} = partnerApiSlice;
