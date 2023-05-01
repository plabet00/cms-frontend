import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";

import { ModelsState } from "./index";
import { setToken } from "../../services/axiosInstance";

const useModels = () => {
  const [cookie] = useCookies(["cms-auth"]);

  useEffect(() => {
    setToken(cookie["cms-auth"]);
  }, [cookie]);

  return useContext(ModelsState);
};

export default useModels;
