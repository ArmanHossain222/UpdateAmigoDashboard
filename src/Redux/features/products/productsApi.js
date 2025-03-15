import { apiSlice } from "../api/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation for uploading product with image
    uploadProduct: builder.mutation({
      query: (formData) => {
        return {
          url: "product-create", // Endpoint for creating a new product
          method: "POST",
          body: formData, // Use FormData as the body
        };
      },
      invalidatesTags: ["products"],
    }),
    getProducts: builder.query({
      query: () => ({
        url: "product-list",
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (product_id) => ({
        url: `product/delete/${product_id}`,
        method: "GET",
      }),
      invalidatesTags: ["products"],
    }),
    editProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `product/edit/${productId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useUploadProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  useEditProductMutation,
} = productApi;
