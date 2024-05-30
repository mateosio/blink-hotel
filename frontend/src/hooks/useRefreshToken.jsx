import useAxios from "../utils/axios.js";
import useAuth from "../hooks/useAuth.jsx";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const axiosInstanse = useAxios();

  const refresh = async () => {
    const response = await axiosInstanse.get("/refresh");

    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
    
  };
  return refresh;
};

export default useRefreshToken;
