import { useState } from "react";
import { useSelector } from "react-redux";
import store from "../../../redux/store";
import Signup from "../signup";
import UploadImage from "../uploadImage";

type RootState = ReturnType<typeof store.getState>;

const SignupWrapper = () => {
  const [isUserSignedup, setIsUserSignedup] = useState(false);
  const authState = useSelector((state: RootState) => state.auth.user);

  const handleSuccessfullSignup = () => {
    setIsUserSignedup(true);
  };

  return (
    <>
      {isUserSignedup ? (
        <UploadImage gender={authState?.gender} />
      ) : (
        <Signup onSuccessfullSignup={handleSuccessfullSignup} />
      )}
    </>
  );
};

export default SignupWrapper;
