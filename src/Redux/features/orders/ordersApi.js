import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => "/order/list",
      providesTags: ["orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: (updateOrderInfo) => {
        return {
          url: `/order/update/${updateOrderInfo?.order_id}`,
          method: "POST",
          body: updateOrderInfo,
        };
      },
      invalidatesTags: ["orders"],
    }),
  }),
});

// Export the hooks
export const { useGetOrderQuery, useUpdateOrderStatusMutation } = ordersApi;
