import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

export const checkLogin = async (req, res, next) => {
  const cookies = req.cookies;

  try {
    if (!cookies?.refreshToken) {
      throw new Error("Usuario debe loguearse");
    }

    const refreshToken = cookies.refreshToken;
    const verify = jwt.verify(refreshToken, config.refreshTokenSecret);

    console.log("lanzo next en el middleware");
    next();
  } catch (error) {
    let statusCode;

    if (error.message === "Usuario debe loguearse" || error.name === "TokenExpiredError"){
      statusCode = 401;
    } else {
      statusCode = 500;
    }

    res.status(statusCode).json({ error: error.message });
  }
};
