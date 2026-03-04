import { apiSlice } from "@/features/api/apiSlice";

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: "/contact",
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result) =>
        result && Array.isArray(result)
          ? [
              ...result.map((item) => ({ type: "Contact", id: item.id })),
              { type: "Contact", id: "LIST" },
            ]
          : [{ type: "Contact", id: "LIST" }],
    }),

    getContact: builder.query({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? response,
      providesTags: (result, error, id) => [{ type: "Contact", id }],
    }),

    updateContact: builder.mutation({
      query: ({ id, body }) => ({
        url: `/contact/${id}`,
        method: "PATCH",
        body,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (result, error, { id }) => [
        { type: "Contact", id },
        { type: "Contact", id: "LIST" },
      ],
    }),

    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Contact", id },
        { type: "Contact", id: "LIST" },
      ],
    }),

    createContact: builder.mutation({
      query: (body) => ({
        url: "/contact",
        method: "POST",
        body,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: [{ type: "Contact", id: "LIST" }],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
  useCreateContactMutation,
} = contactApiSlice;

