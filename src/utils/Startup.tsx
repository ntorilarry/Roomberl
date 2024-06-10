import React from "react";
import AppRouter from "./AppRouter";
import { Toaster } from "react-hot-toast";

const Startup = () => {
  return (
    <div>
      <Toaster />
      <AppRouter />
    </div>
  );
};

export default Startup;
