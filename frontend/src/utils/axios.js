import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";

export default axios.create({
  baseURL: "https://blink-hotel-server.vercel.app",
  withCredentials: true,
})

export const axiosInstance = axios.create({
  baseURL: "https://blink-hotel-server.vercel.app",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const useAxios = () => {
  const refresh = useRefreshToken();

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await refresh();
        
        
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(prevRequest);
      }
      
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};