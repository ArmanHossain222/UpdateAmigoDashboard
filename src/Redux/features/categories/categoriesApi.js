import { apiSlice } from "../api/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation for adding a new category
    createCategory: builder.mutation({
      query: (categoryData) => {
        return {
          url: "/category/create", // Endpoint for creating a new product
          method: "POST",
          body: categoryData, // Use FormData as the body
        };
      },
      invalidatesTags: ["categories"],
    }),
    updateCategory: builder.mutation({
      query: (category) => {
        return {
          url: `/category/edit/${category?.id} `,
          method: "POST",
          body: category,
        };
      },
      invalidatesTags: ["categories"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
    deleteCategory: builder.mutation({
      query: (category_id) => ({
        url: `/category/delete/${category_id}`,
        method: "GET",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = productApi;
