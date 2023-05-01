import React, { useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { setToken } from "../../services/axiosInstance";

const ProtectedRoute = ({ children }) => {
  const [cookie] = useCookies(["cms-auth"]);

  useLayoutEffect(() => {
    setToken(cookie["cms-auth"]);
  }, [cookie]);

  return cookie["cms-auth"] ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
