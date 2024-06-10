import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../core/app-constants";
import { BaseResponse } from "../models/response/base-response";
import { institutionResponse } from "../models/response/institution-response";

export const literalsService = createApi({
  reducerPath: "literalsService",
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

  tagTypes: ["Literals"],
  endpoints: (build) => ({
    getAllLiterals: build.query<BaseResponse<any>, void>({
      query: () => ({
        url: "/literals/all/",
        method: "GET",
      }),
      providesTags: ["Literals"],
    }),
  }),
});

export const { useGetAllLiteralsQuery } = literalsService;
