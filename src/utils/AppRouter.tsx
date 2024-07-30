import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "../presentation/auth/SignUp";
import LogIn from "../presentation/auth/LogIn";
import MainLayout from "../shared/MainLayout";
import SignUpAdditionalInfo from "../presentation/auth/SignUpAdditionalInfo";
import ViewRoomTypes from "../presentation/main/rooms/viewRoomTypes/ViewRoomTypes";
import RoomAmenities from "../presentation/main/rooms/roomAmenities/RoomAmenities";
import RoomType from "../presentation/main/rooms/roomType/RoomType";
import AllRooms from "../presentation/main/rooms/allRooms/AllRooms";
import RoomDetails from "../presentation/main/rooms/roomDetails/RoomDetails";
import ViewRooms from "../presentation/main/rooms/viewRooms/ViewRooms";
import Members from "../presentation/main/members/Members";
import UserPayment from "../presentation/main/payment/userPayment/UserPayment";
import Users from "../presentation/main/users/Users";
import AdminPayment from "../presentation/main/payment/adminPayment/AdminPayment";
import QuestionAnswer from "../presentation/auth/QuestionAnswer";
import UsersPaymentSuccess from "../presentation/main/payment/userPayment/UsersPaymentSuccess";
import ChooseRoomSuccess from "../presentation/main/rooms/roomDetails/components/ChooseRoomSuccess";
import UnselectRoomSuccess from "../presentation/main/rooms/roomDetails/components/UnselectRoomSuccess";
import UnauthorizedPage from "../presentation/auth/Unauthorized";
import Message from "../presentation/main/messages/Message";
import Chat from "../presentation/main/messages/Chat";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth">
        <Route index element={<Navigate replace to="login" />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="login/:code_name" element={<LogIn />} />
        <Route path="sign-up-additional" element={<SignUpAdditionalInfo />} />
        <Route path="questions-and-answers" element={<QuestionAnswer />} />
        <Route path="unauthorized" element={<UnauthorizedPage />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate replace to="members" />} />
        <Route path="members" element={<Members />} />
        <Route path="users" element={<Users />} />

        <Route path="rooms">
          <Route index element={<Navigate replace to="view-room-types" />} />
          <Route path="view-room-types" element={<ViewRoomTypes />} />
          <Route path="amenities" element={<RoomAmenities />} />
          <Route path="roomtypes" element={<RoomType />} />
          <Route path="all-rooms" element={<AllRooms />} />
          <Route path="rooms/:roomTypeId" element={<ViewRooms />} />
          <Route
            path="room-details/:roomTypeId/:roomId"
            element={<RoomDetails />}
          />
          <Route
            path="room-details/choose-room/success"
            element={<ChooseRoomSuccess />}
          />
          <Route
            path="room-details/leave-room/success"
            element={<UnselectRoomSuccess />}
          />
          <Route path="payment" element={<UserPayment />} />
        </Route>

        <Route path="payments">
          <Route path="user" element={<UserPayment />} />
          <Route path="verify-payment" element={<AdminPayment />} />
          <Route path="success" element={<UsersPaymentSuccess />} />
        </Route>

        <Route path="message">
          <Route path="history" element={<Message />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
