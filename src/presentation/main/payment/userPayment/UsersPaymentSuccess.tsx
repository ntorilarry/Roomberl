import { Success } from "../../../../assets";
import { Player } from "@lottiefiles/react-lottie-player";

const UsersPaymentSuccess = () => {
  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-2xl bg-white dark:bg-slate-800">
          <Player src={Success} className="player mx-auto w-48" loop autoplay />
          <h1 className="text-center py-3 font-semibold text-xl dark:text-white">
            You have successfully submitted your payment proof
          </h1>
          <p className="text-base text-center dark:text-white py-3">
            We've received your payment proof. Our team will now process it and
            verify your payment. You'll be notified once it's complete.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsersPaymentSuccess;
