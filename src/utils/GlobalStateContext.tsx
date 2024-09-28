import React, { createContext, useState, useContext, ReactNode } from "react";

interface GlobalState {
  isPaymentVerified: boolean | null;
  setIsPaymentVerified: (value: boolean | null) => void;
  isRoomTypePresent: string | null;
  setIsRoomTypePresent: (value: string | null) => void;
  RoomIdPresent: string | null;
  setRoomIdPresent: (value: string | null) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  paymentRoomTypeId: string | null;
  setPaymentRoomTypeId: (value: string | null) => void;
  questionResponse: [] | null;
  setQuestionResponse: (value: [] | null) => void;
  paymentStatus: string | null;
  setPaymentStatus: (value: string | null) => void;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [isPaymentVerified, setIsPaymentVerified] = useState<boolean | null>(
    null
  );
  const [isRoomTypePresent, setIsRoomTypePresent] = useState<string | null>(
    null
  );
  const [RoomIdPresent, setRoomIdPresent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [paymentRoomTypeId, setPaymentRoomTypeId] = useState<string | null>(
    null
  );
  const [questionResponse, setQuestionResponse] = useState<[] | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  return (
    <GlobalStateContext.Provider
      value={{
        isPaymentVerified,
        setIsPaymentVerified,
        isRoomTypePresent,
        setIsRoomTypePresent,
        RoomIdPresent,
        setRoomIdPresent,
        searchQuery,
        setSearchQuery,
        paymentRoomTypeId,
        setPaymentRoomTypeId,
        questionResponse,
        setQuestionResponse,
        paymentStatus,
        setPaymentStatus,
      }}
    >
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
