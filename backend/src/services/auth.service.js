import User from "../model/User.js"
import { config } from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const checkLogin = async (cookies) =>{
  try {
    if(!cookies?.refreshToken) { 
      console.log("no tengo token en el servicio de checklogin"); 
      throw new Error("Usuario debe loguearse");
    };
  
    const refreshToken = cookies.refreshToken;
    const verify = jwt.verify(refreshToken, config.refreshTokenSecret);
  
    const user = await User.findOne({ refreshToken });
    console.log("usuario encontrado", user);
    const payload = {
      sub: user.username,
    };
    const accessToken = jwt.sign(payload, config.accessTokenSecret);
    const username = user.username;
    return {username, accessToken};
    
  } catch (error) {
    throw error;
  }
}


export const login = async (username, password) => {
  try {
    
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
