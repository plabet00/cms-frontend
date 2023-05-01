import { api } from "../axiosInstance";

export const login = async (email, password) => {
  const response = await api
    .post("/login", {
      email: email,
      password: password,
    })
    .then((response) => response);
  return response;
};
