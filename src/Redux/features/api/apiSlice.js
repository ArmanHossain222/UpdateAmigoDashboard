import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "ecommerceDashboard",
  tagTypes: [
    "user",
    "orders",
    "products",
    "categories",
    "subscription",
    "flashSales",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.amigofabric.com/api/",
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = localStorage.getItem("user_token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      
      // Define endpoints that should skip the Content-Type header
      const skipContentTypeFor = ["uploadProduct", "editProduct"];

      // Only set Content-Type for requests not included in the skip list
      if (!skipContentTypeFor.includes(endpoint)) {
        headers.set("Content-Type", "application/json");
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
