
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || " https://restaurant-app-z9ol.onrender.com",
});

export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
};

export default api;
