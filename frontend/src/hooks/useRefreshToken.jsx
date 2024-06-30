import axios from "../utils/axios.js";
import useAuth from "../hooks/useAuth.jsx";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return { ...prev, accessToken: response.data.newAccessToken };
    });
    
    return response.data.newAccessToken;
    
  };
  return refresh;
};

export default useRefreshToken;
