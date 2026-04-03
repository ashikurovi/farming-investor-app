import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://farming-investor-api.vercel.app",
    // Set authorization header if to
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: [
    "Investor",
    "Admin",
    "User",
    "Project",
    "Glarry",
    "Banner",
    "Contact",
    "InvestorType",
    "Notice",
    "DailyReport",
    "Deed",
    "Partner",
    "Partners",
    "InvestAmount",
    "Investment",
    "InvestorPayout"
  ],
  endpoints: () => ({}),
});
