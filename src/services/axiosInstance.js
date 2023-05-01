import axios from "axios";

const createInstance = () => {
  return axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const setToken = (token) => {
  api.defaults.headers.common["cms-auth"] = token;
};

const api = createInstance();

export { setToken, api };
