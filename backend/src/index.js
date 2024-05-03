import express from "express";
import { config } from "./config/config.js";
import cors from "cors";
import roomsRoute from "./routes/rooms.route.js";
import registerRoute from "./routes/register.route.js";
import loginRoute from "./routes/login.route.js";

const app = express();
const port = config.port || 3000;

app.use(express.json());
app.use(cors());
app.use("/rooms", roomsRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
 

app.listen(port, ()=>{
    console.log("El servidor funciona en puerto 3000");
})