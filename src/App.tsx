import React from "react";
import "./App.css";
import Startup from "./utils/Startup";
import { GlobalStateProvider } from "./utils/GlobalStateContext";

const App = () => {
  return (
    <GlobalStateProvider>
      <Startup />
    </GlobalStateProvider>
  );
};

export default App;
