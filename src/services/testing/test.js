import { api } from "../axiosInstance";

export const testGetCall = async () => {
  const response = await api.get("/ping");

  return response;
};
