import {findOne} from "../services/register.service.js";

export const handleRefreshToken = async (req) => {
  
    const cookies = req.cookies;
    if (!cookies?.refreshToken) throw new Error('Unauthorized');

    const refreshToken = cookies.refreshToken;

    const user = await findOne("refreshToken", refreshToken);

    if (!user) throw new Error('Forbidden'); 
    
    // evaluate jwt
    try {
      const verify = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      )
  } catch (error) {
      throw error;
  }

    const newAccessToken = jwt.sign(
       { sub: user.username },
       process.env.ACCESS_TOKEN_SECRET,
       { expiresIn: "30s" }
    );

    return newAccessToken;
 
};
