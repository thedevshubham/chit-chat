import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useOutlet } from "react-router-dom";

const ProtectedLayout = () => {
  const isAuthUser = useAuth();
  const outlet = useOutlet();

  if (!isAuthUser) {
    return <Navigate to="/login" />;
  }

  return <>{outlet}</>;
};

export default ProtectedLayout;
