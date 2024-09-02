import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import User from "../model/User.js";

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) throw new Error("Unauthorized");
  
  const refreshToken = cookies.refreshToken;

  //Limpio la cookie para luego enviar un nuevo access y refresh token.
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  const user = await User.findOne({ refreshToken });
  
  // Detecto una posible reutilización de token.
  if (!user) {
    jwt.verify(
      refreshToken,
      config.refreshTokenSecret,
      async (error, decoded) => {
        if (error) throw new Error("Forbidden");
        const username = decoded.sub;
        const hackedUser = await User.findOne({ username: username });
        hackedUser.refreshToken = [];
        const result = await hackedUser.save();
        throw new Error("Unauthorized");
      }
    );
  }

  const newRefreshTokenArray = user.refreshToken.filter((rt) => rt !== refreshToken);

  // Evalúo el refresh token
  try {
    const verify = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    if (user.username !== verify.sub){
      user.refreshToken = [...newRefreshTokenArray];
      const result = await user.save();
      throw new Error("Unauthorized")
    }

    const newAccessToken = jwt.sign(
      { sub: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

  const newRefreshToken = jwt.sign(
      { sub: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
  );

  // Saving refreshToken with current user
  user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  const result = await user.save();

  return {newAccessToken, newRefreshToken};

  } catch (error) {
    user.refreshToken = [...newRefreshTokenArray];
    const result = await user.save();
    throw new Error("Forbidden");
  }
};
