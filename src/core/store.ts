import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authService } from "../services/auth-service";
import { literalsService } from "../services/literals-service";
import { roomService } from "../services/room-service";
import { userService } from "../services/user-service";
import { messageService } from "../services/message-service";

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [literalsService.reducerPath]: literalsService.reducer,
    [roomService.reducerPath]: roomService.reducer,
    [userService.reducerPath]: userService.reducer,
    [messageService.reducerPath]: messageService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authService.middleware,
      literalsService.middleware,
      roomService.middleware,
      userService.middleware,
      messageService.middleware,
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
