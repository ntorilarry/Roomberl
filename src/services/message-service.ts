import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../core/app-constants";
import { BaseResponse } from "../models/response/base-response";
import { chatRequest } from "../models/request/message-request";

export const messageService = createApi({
  reducerPath: "messageService",
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

  tagTypes: ["Messages"],
  endpoints: (build) => ({
    startMessage: build.mutation<BaseResponse<any>, chatRequest>({
      query: (body: chatRequest) => ({
        url: "/chats/start/",
        method: "POST",
        body: body
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const { useStartMessageMutation } = messageService;
