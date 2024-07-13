import { Player } from "@lottiefiles/react-lottie-player";
import { Success } from "../../../../../assets";

const UnselectRoomSuccess = () => {
  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-2xl bg-white dark:bg-slate-800">
          <Player src={Success} className="player mx-auto w-48" loop autoplay />
          <h1 className="text-center py-3 font-semibold text-xl dark:text-white">
            You are no longer part of this room
          </h1>
        </div>
      </div>
    </div>
  );
};

export default UnselectRoomSuccess;
