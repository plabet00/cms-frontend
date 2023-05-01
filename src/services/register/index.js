import { api } from "../axiosInstance";

export const register = async (email, password) => {
  const response = await api.post("/register", {
    email: email,
    password: password,
  });

  return response;
};
