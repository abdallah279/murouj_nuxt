import axios from "axios";

export const useApi = () => {
  const baseURL = "https://backend.murouj.aait-sa.com/api/";

  if(process.client){
    axios.defaults.headers.lang = localStorage.getItem("lang") || "ar";
  }

  return axios.create({
    baseURL,
  });
};