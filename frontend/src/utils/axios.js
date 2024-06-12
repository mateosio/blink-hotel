import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";

export default axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
})

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
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
        console.log("El interceptor de axios ejecuta el refresh");
        const newAccessToken = await refresh();
        console.log("nuevo accessToken", newAccessToken);
        
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(prevRequest);
      }
      
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};