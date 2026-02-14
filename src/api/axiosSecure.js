import axios from "axios";

export const api = axios.create({
  baseURL: '/',          // now requests go to the same origin as frontend
  withCredentials: true,
});