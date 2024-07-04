import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../core/app-constants";
import { BaseResponse } from "../models/response/base-response";
import {
  paymentParams,
  roomAmenityParams,
  roomAmenityRequest,
  roomTypeRequest,
  roomTypesParams,
} from "../models/request/room-request";

export const roomService = createApi({
  reducerPath: "roomService",
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

  tagTypes: ["Room"],
  endpoints: (build) => ({
    getRooms: build.query<
      BaseResponse<any>,
      { roomTypeId: string; hostelId: string }
    >({
      query: ({ roomTypeId, hostelId }) => ({
        url: `/room/rooms/?room_type=${roomTypeId}&hostel=${hostelId}`,
        method: "GET",
      }),
      providesTags: ["Room"],
    }),
    getRoomsById: build.query<
      BaseResponse<any>,
      { roomTypeId: string; hostelId: string; id: string }
    >({
      query: ({ roomTypeId, hostelId, id }) => ({
        url: `/room/rooms/?room_type=${roomTypeId}&hostel=${hostelId}&id=${id}`,
        method: "GET",
      }),
      providesTags: ["Room"],
    }),
    addRoom: build.mutation<BaseResponse<any>, FormData>({
      query: (body: FormData) => ({
        url: "/room/rooms/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Room"],
    }),
    getRoomAmenities: build.query<BaseResponse<any>, void>({
      query: () => ({
        url: "/room/amenities/",
        method: "GET",
      }),
      providesTags: ["Room"],
    }),
    addRoomAmenities: build.mutation<BaseResponse<any>, roomAmenityRequest>({
      query: (body: roomAmenityRequest) => ({
        url: "/room/amenities/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Room"],
    }),
    updateRoomAmenities: build.mutation<BaseResponse<any>, roomAmenityParams>({
      query: ({body, id}: roomAmenityParams) => ({
        url: `/room/amenities/${id}/`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Room"],
    }),
    deleteRoomAmenities: build.mutation<BaseResponse<any>, string>({
      query: (id) => ({
        url: `/room/amenities/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Room"],
    }),
    getRoomType: build.query<BaseResponse<any>, string>({
      query: (hostelId) => ({
        url: `/room/room_types/?hostel=${hostelId}`,
        method: "GET",
      }),
      providesTags: ["Room"],
    }),

    addRoomType: build.mutation<BaseResponse<any>, roomTypeRequest>({
      query: (body: roomTypeRequest) => ({
        url: "/room/room_types/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Room"],
    }),

    editRoomType: build.mutation<BaseResponse<any>, roomTypesParams>({
      query: ({body, id}: roomTypesParams) => ({
        url: `/room/room_types/${id}/`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Room"],
    }),
    deleteRoomType: build.mutation<BaseResponse<any>, string>({
      query: (id) => ({
        url: `/room/room_types/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Room"],
    }),
    makeRoomPayment: build.mutation<BaseResponse<any>, FormData>({
      query: (body: FormData) => ({
        url: "/accounts/room-payment/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Room"],
    }),
    getRoomPayment: build.query<BaseResponse<any>, void>({
      query: () => ({
        url: "/accounts/room-payment/",
        method: "GET",
      }),
      providesTags: ["Room"],
    }),
    verifyRoomPayment: build.mutation<BaseResponse<any>, paymentParams>({
      query: ({body, id}: paymentParams) => ({
        url: `/accounts/room-payment/${id}/`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Room"],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomsByIdQuery,
  useAddRoomMutation,
  useGetRoomAmenitiesQuery,
  useAddRoomAmenitiesMutation,
  useUpdateRoomAmenitiesMutation,
  useDeleteRoomAmenitiesMutation,
  useGetRoomTypeQuery,
  useAddRoomTypeMutation,
  useEditRoomTypeMutation,
  useDeleteRoomTypeMutation,
  useMakeRoomPaymentMutation,
  useGetRoomPaymentQuery,
  useVerifyRoomPaymentMutation
} = roomService;
