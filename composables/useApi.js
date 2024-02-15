import axios from "axios";

export const useApi = () => {
  const baseURL = "https://backend.murouj.aait-sa.com/api/";
  if (process.client) {
    const token = localStorage.getItem("token");
    const lang = localStorage.getItem("lang");
    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.lang = `${lang}`;
  }

  return axios.create({
    baseURL,
  });
};
