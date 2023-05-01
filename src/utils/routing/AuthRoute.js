import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AuthRoute = ({ children }) => {
  const [cookie] = useCookies(["cms-autht"]);

  return !cookie["cms-auth"] ? children : <Navigate to="/" />;
};

export default AuthRoute;
