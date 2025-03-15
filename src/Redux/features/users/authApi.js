import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getUserInfo: builder.query({
      query: () => "user",
      providesTags: ["user"],
    }),
    getSubscriberList: builder.query({
      query: () => "/subscriber/list",
      providesTags: ["subscription"],
    }),
    deleteSubscriber: builder.mutation({
      query: (subscriber_id) => ({
        url: `/subscriber/delete/${subscriber_id}`,
        method: "GET",
      }),
      invalidatesTags: ["subscription"],
    }),
  }),
});

// Export the hooks
export const {
  useLoginMutation,
  useGetUserInfoQuery,
  useGetSubscriberListQuery,
  useDeleteSubscriberMutation,
} = authApi;
