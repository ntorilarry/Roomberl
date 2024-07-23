import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../core/app-constants";
import { BaseResponse } from "../models/response/base-response";
import {
  UpdateChooseRoomParams,
  UpdateRoomTypeParams,
  UpdateUserQuestionsParams,
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

    getAddInfoByUserId: build.query<BaseResponse<any>, string>({
      query: (userId ) => ({
        url: `/accounts/user-additional-detail/${userId}/`,
        method: "GET",
   
      }),
      providesTags: ["Auth"],
    }),


    updateRoomType: build.mutation<BaseResponse<any>, UpdateRoomTypeParams>({
      query: ({ body, userId }: UpdateRoomTypeParams) => ({
        url: `/accounts/user-additional-detail/${userId}/`,
        method: "PATCH",
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
    getHostelByCodeName: build.query<BaseResponse<any>, string>({
      query: (code_name) => ({
        url: `/literals/hostel/${code_name}/`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    getQuestions: build.query<BaseResponse<any>, void>({
      query: () => ({
        url: "/question/question/",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    updateUserQuestions: build.mutation<BaseResponse<any>, UpdateUserQuestionsParams>({
      query: ({ body, userId }: UpdateUserQuestionsParams) => ({
        url: `/accounts/user-additional-detail/${userId}/`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    ChooseRoom: build.mutation<BaseResponse<any>, UpdateChooseRoomParams>({
      query: ({ body, userId }: UpdateChooseRoomParams) => ({
        url: `/accounts/user-additional-detail/${userId}/`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useSignUpAddInfoMutation,
  useGetHostelsQuery,
  useUpdateRoomTypeMutation,
  useGetAddInfoByUserIdQuery,
  useGetQuestionsQuery,
  useUpdateUserQuestionsMutation,
  useChooseRoomMutation,
  useGetHostelByCodeNameQuery
} = authService;
