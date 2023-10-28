import { Navigate, useOutlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoginLayout = () => {
  const isAuthUser = useAuth();
  const outlet = useOutlet();

  if (isAuthUser) {
    return <Navigate to="/chat" />;
  }

  return <>{outlet}</>;
};

export default LoginLayout;
