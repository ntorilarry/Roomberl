import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../core/app-constants";
import { BaseResponse } from "../models/response/base-response";
import { EnableUserParams } from "../models/request/user-request";

export const userService = createApi({
  reducerPath: "userService",
  baseQuery: fetchBaseQuery({
    baseUrl: `${AppConstants.baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
      const token = sessionStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsersByHostelId: build.query<BaseResponse<any>, string>({
      query: (hostelId ) => ({
        url: `/accounts/users/?hostel=${hostelId}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    deleteUser: build.mutation<BaseResponse<any>, string>({
      query: (id) => ({
        url: `/accounts/users/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    
    enableUser: build.mutation<BaseResponse<any>, EnableUserParams>({
      query: ({ body, userId }: EnableUserParams) => ({
        url: `/accounts/users/${userId}/`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersByHostelIdQuery,
  useDeleteUserMutation,
  useEnableUserMutation,
} = userService;
