import axios from "axios";
export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  withCredentials: true,
});
export const api = axiosSecure;
