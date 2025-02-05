import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const flowerApi = createApi({
  reducerPath: "flowerManagement",

  tagTypes: ["FlowerList"],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getFlowers: builder.query({
      query: () => `product`,

      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "flowerManagement", id })),
              { type: "FlowerList", id: "LIST" },
            ]
          : [{ type: "FlowerList", id: "LIST" }],
    }),
    addFlower: builder.mutation({
      query: (body) => {
        return {
          method: "POST",
          url: `product`,
          body,
        };
      },
      invalidatesTags: [{ type: "FlowerList", id: "LIST" }],
    }),
    editFlower: builder.mutation({
      query: (payload) => {
        return {
          method: "PUT",
          url: `product/` + payload.id,
          body: payload.body,
        };
      },
      invalidatesTags: (res, err, arg) => [{ type: "FlowerList", id: arg.id }],
    }),
    deleteFlower: builder.mutation({
      query: (payload) => {
        return {
          method: "DELETE",
          url: `product/` + payload.id,
        };
      },
      invalidatesTags: (_res, _err, _arg) => [
        { type: "FlowerList", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetFlowersQuery,
  useAddFlowerMutation,
  useEditFlowerMutation,
  useDeleteFlowerMutation,
} = flowerApi;
