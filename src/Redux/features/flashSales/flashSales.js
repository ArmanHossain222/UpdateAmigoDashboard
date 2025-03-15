import { apiSlice } from "../api/apiSlice";

export const flashSaleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFlashSales: builder.query({
      query: () => "flash-sale-list",
      providesTags: ["flashSales"],
    }),
    createFlashSale: builder.mutation({
      query: (newFlashSale) => ({
        url: "flash-sale/create",
        method: "POST",
        body: newFlashSale,
      }),
      invalidatesTags: ["flashSales"],
    }),
    createFlashSaleProduct: builder.mutation({
      query: (newFlashSale) => ({
        url: "flash-sale-products/create",
        method: "POST",
        body: newFlashSale,
      }),
      invalidatesTags: ["flashSales"],
    }),
    editFlashSale: builder.mutation({
      query: (flashSale) => ({
        url: `flash-sale-edit/${flashSale.id}`,
        method: "POST",
        body: flashSale,
      }),
      invalidatesTags: ["flashSales"],
    }),
    deleteFlashSale: builder.mutation({
      query: (flash_sale_id) => ({
        url: `flash-sale/delete/${flash_sale_id}`,
        method: "GET",
      }),
      invalidatesTags: ["flashSales"],
    }),
    getFlashSalesProductList: builder.query({
      query: () => "flash-sale-products-list",
    }),
    getFlashSalesProductById: builder.query({
      query: (id) => `fsp-by-fs/${id}`,
    }),
    getAllFlashSalesProducts: builder.query({
      query: () => "flash-sales",
      providesTags: ["flashSalesProducts"],
    }),
    deleteFlashSaleProduct: builder.mutation({
      query: ({ flash_sale_id, product_id }) => ({
        url: `flash-sale-products/delete/${flash_sale_id}/${product_id}`,
        method: "GET",
      }),
      invalidatesTags: ["flashSalesProducts"],
    }),
  }),
});

// Export the hooks
export const {
  useGetFlashSalesQuery,
  useDeleteFlashSaleMutation,
  useCreateFlashSaleMutation,
  useEditFlashSaleMutation,
  useCreateFlashSaleProductMutation,
  useGetFlashSalesProductListQuery,
  useGetFlashSalesProductByIdQuery,
  useGetAllFlashSalesProductsQuery,
  useDeleteFlashSaleProductMutation,
} = flashSaleApi;
