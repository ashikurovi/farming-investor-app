import { apiSlice } from "../api/apiSlice";

export const partnerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPartners: builder.query({
      query: () => "/partner",
      providesTags: [{ type: "User", id: "LIST" }, "User", "Partners"],
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
      invalidatesTags: [{ type: "User", id: "LIST" }, "User", "Partners"],
    }),
    deletePartner: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`, // Backend uses /users/:id to delete any user/partner
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }, "User", "Partners"],
    }),
    addInvestment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/partner/${id}/invest`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id }, 
        { type: "User", id: "LIST" }, 
        "User", 
        "Partners",
        { type: "Investment", id: "LIST" },
        { type: "Investment", id: "STATS" },
        { type: "Investment", id: "RECENT" }
      ],
    }),
    distributeCommission: builder.mutation({
      query: (data) => ({
        url: "/partner/commission/distribute",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }, "User", "Partners"],
    }),
    withdrawPartnerProfit: builder.mutation({
      query: ({ id, data }) => ({
        url: `/partner/${id}/withdraw-profit`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }, { type: "User", id: "LIST" }, "User", "Partners"],
    }),
    getPartnerPayouts: builder.query({
      query: (id) => `/partner/${id}/payouts`,
      providesTags: ["Partners"],
    }),
    getAllPartnerPayouts: builder.query({
      query: () => `/partner/payouts`,
      providesTags: ["Partners"],
    }),
    deletePartnerPayout: builder.mutation({
      query: (id) => ({
        url: `/partner/payout/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Partners", "User"],
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
  useDeletePartnerMutation,
  useDeletePartnerPayoutMutation,
} = partnerApiSlice;
