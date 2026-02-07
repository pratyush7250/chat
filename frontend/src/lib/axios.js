import axios from "axios";
export const axiosInstance = axios.create({
  baseURL:"https://chat-587d.onrender.com/api",
  withCredentials:true,
})
