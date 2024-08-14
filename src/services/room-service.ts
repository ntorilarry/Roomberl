import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../core/app-constants";
import { BaseResponse } from "../models/response/base-response";
import {
  duplicateRoomParams,
  lockRoomParams,
  paymentParams,
  roomAmenityParams,
  roomAmenityRequest,
  roomTypeRequest,
  roomTypesParams,
  UpdateRoomParams,
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
      { roomTypeId: string, hostelId: string, gender: string, page: number, size: number }
    >({
      query: ({ roomTypeId, hostelId, gender, page, size }) => ({
        url: `/room/rooms/?room_type=${roomTypeId}&hostel=${hostelId}&gender=${gender}&page=${page}&size=${size}`,
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
    updateRoom: build.mutation<BaseResponse<any>, UpdateRoomParams>({
      query: ({body, id}: UpdateRoomParams) => ({
        url: `/room/rooms/${id}/`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Room"],
    }),
    duplicateRoom: build.mutation<BaseResponse<any>, duplicateRoomParams>({
      query: ({ id, quantity}: duplicateRoomParams) => ({
        url: `/room/duplicate/${id}/${quantity}/`,
        method: "POST"
      }),
      invalidatesTags: ["Room"],
    }),
    lockRoom: build.mutation<BaseResponse<any>, lockRoomParams>({
      query: ({body, id}: lockRoomParams) => ({
        url: `/room/rooms/${id}/`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Room"],
    }),
    deleteRoom: build.mutation<BaseResponse<any>, string>({
      query: (id) => ({
        url: `/room/rooms/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Room"],
    }),
    getRoomAmenities: build.query<BaseResponse<any>, {page: number, size: number}>({
      query: ({page, size}) => ({
        url: `/room/amenities/?page=${page}&size=${size}`,
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
    getRoomType: build.query<BaseResponse<any>, {hostelId: string, page: number, size: number}>({
      query: ({hostelId, page, size}) => ({
        url: `/room/room_types/?hostel=${hostelId}&page=${page}&size=${size}`,
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
    getRoomPayment: build.query<BaseResponse<any>, {hostelId: string, page: number, size: number}>({
      query: ({hostelId, page, size}) => ({
        url: `/accounts/room-payment/?hostel=${hostelId}&page=${page}&size=${size}`,
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
  useVerifyRoomPaymentMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useLockRoomMutation,
  useDuplicateRoomMutation,
} = roomService;
