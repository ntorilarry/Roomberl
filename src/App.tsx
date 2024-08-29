import React from "react";
import "./App.css";
import Startup from "./utils/Startup";
import { GlobalStateProvider } from "./utils/GlobalStateContext";
import UserAdditionalDetails from "./presentation/auth/UserAdditionalDetails";

const App = () => {
  return (
    <GlobalStateProvider>
      <UserAdditionalDetails />
      <Startup />
    </GlobalStateProvider>
  );
};

export default App;
