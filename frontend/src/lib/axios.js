import axios from "axios";
export const axiosInstance = axios.create({
  baseURL:"https://chat-backend-fejm.onrender.com/api",
  withCredentials:true,
})
