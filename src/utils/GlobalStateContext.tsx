import React, { createContext, useReducer, useContext, ReactNode } from "react";

interface GlobalState {
  isPaymentVerified: boolean | null;
  isRoomTypePresent: string | null;
  RoomIdPresent: string | null;
}

interface GlobalStateContextType {
  state: GlobalState;
  dispatch: React.Dispatch<any>;
}

const initialState: GlobalState = {
  isPaymentVerified: null,
  isRoomTypePresent: null,
  RoomIdPresent: null,
};

const GlobalStateContext = createContext<GlobalStateContextType>({
  state: initialState,
  dispatch: () => null,
});

const globalStateReducer = (state: GlobalState, action: any): GlobalState => {
  switch (action.type) {
    case "SET_IS_PAYMENT_VERIFIED":
      return { ...state, isPaymentVerified: action.payload };
    case "SET_IS_ROOM_TYPE_PRESENT":
      return { ...state, isRoomTypePresent: action.payload };
    case "SET_ROOM_ID_PRESENT":
      return { ...state, RoomIdPresent: action.payload };
    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);
  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
