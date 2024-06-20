import User from "../model/User.js"
import { config } from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const login = async (username, password, cookies) => {
  try {
    // if(cookies?.refreshToken) throw new Error("Usuario logueado");

    const user = await User.findOne({username});
       
    if (!user) {
      throw new Error("Usuario no registrado");
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Contraseña incorrecta");
      } else {
        const payload = {
          sub: user.username,
        };

        const accessToken = jwt.sign(payload, config.accessTokenSecret, {
          expiresIn: "10m",
        });
        const refreshToken = jwt.sign(payload, config.refreshTokenSecret, {
          expiresIn: "1d",
        });

        const id = user._id;
        
        //Guardo el refreshToken en la base de datos
        const filter = { _id: id };
        const updateDocument = {
          $push: {
            refreshToken: refreshToken,
          },
        };

        const updateRefreshToken = await User.updateOne(filter, updateDocument);

        return { username, accessToken, refreshToken };
      }
    }
  } catch (error) {
    throw error;
  }
};
