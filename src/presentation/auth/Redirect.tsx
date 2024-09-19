import React, { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { RedirectGif } from "../../assets";

const Redirect = () => {
  useEffect(() => {
    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = "https://roomberl.com/universities/";
    }, 5000);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="grid h-screen place-content-center max-w-4xl mx-auto bg-white px-4">
        <div className="text-center">
          <Player
            src={RedirectGif}
            className="player w-72 h-72"
            loop
            autoplay
          />

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            This page cannot be found
          </h1>

          <p className="mt-4 text-gray-500">Redirecting...</p>
        </div>
      </div>
    </div>
  );
};

export default Redirect;
