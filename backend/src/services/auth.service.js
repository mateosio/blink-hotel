import { MongoClient } from "mongodb";
import { config } from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findOne } from "./register.service.js";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("hotel-blink");
const usersCollections = db.collection("users");

export const login = async (username, password) => {
  try {
    await client.connect();
    
    const user = await findOne("username", username);
       
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
          $set: {
            refreshToken: refreshToken,
          },
        };

        const updateRefreshToken = await usersCollections.updateOne(
          filter,
          updateDocument
        );

        return { username, accessToken, refreshToken };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};
