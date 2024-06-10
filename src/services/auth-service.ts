import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../core/app-constants";
import { BaseResponse } from "../models/response/base-response";
import {
  loginRequest,
  signUpAddInfoRequest,
  signUpRequest,
} from "../models/request/auth-request";

export const authService = createApi({
  reducerPath: "authService",
  baseQuery: fetchBaseQuery({
    baseUrl: `${AppConstants.baseUrl}`,
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    signUp: build.mutation<BaseResponse<any>, signUpRequest>({
      query: (body: signUpRequest) => ({
        url: "/accounts/signup/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: build.mutation<BaseResponse<any>, loginRequest>({
      query: (body: loginRequest) => ({
        url: "/accounts/login/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    signUpAddInfo: build.mutation<BaseResponse<any>, signUpAddInfoRequest>({
      query: (body: signUpAddInfoRequest) => ({
        url: "/accounts/user-additional-detail/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),

    getHostels: build.query<BaseResponse<any>, void>({
      query: () => ({
        url: "/literals/Unauthenticated/",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useSignUpAddInfoMutation,
  useGetHostelsQuery,
} = authService;
