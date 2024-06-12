import axios from "../utils/axios.js";
import useAuth from "../hooks/useAuth.jsx";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  
  const refresh = async () => {
    console.log("se lanza la función refresh");
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
    
  };
  return refresh;
};

export default useRefreshToken;
