//importo la biblioteca dotenv.
import dotenv from "dotenv";

//Ejecuto el método config que lo que hace es leer el archivo .env y carga las variables allí definidas en el objeto process.env
dotenv.config();

export const config = {
    port: process.env.PORT,
    mongoDB_Uri: process.env.MONGODB_URI,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
}