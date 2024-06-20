import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/dbConnection.js";
import { config } from "./config/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import roomsRoute from "./routes/rooms.route.js";
import registerRoute from "./routes/register.route.js";
import loginRoute from "./routes/login.route.js";
import refreshTokenRoute from "./routes/refreshToken.route.js";
import logoutRoute from "./routes/logout.route.js";
import availabilityRoute from "./routes/availability.route.js";

const app = express();
const port = config.port || 3000;

const corsOptions = {
    origin: true, 
    credentials: true 
  };

// Me conecto a mongoDB
connectDB();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/rooms", roomsRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/refresh", refreshTokenRoute);
app.use("/logout", logoutRoute);
app.use("/availability", availabilityRoute);
 
mongoose.connection.once('open', () => {
  console.log("Connected to MongoDB");
  app.listen(port, ()=>{
    console.log("El servidor funciona en puerto 3000")})
});

