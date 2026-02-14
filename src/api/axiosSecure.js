import axios from "axios";

// 🔥 global default set করে দিচ্ছি
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_API;
axios.defaults.withCredentials = true;

export default axios;
