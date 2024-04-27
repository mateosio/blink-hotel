import express from "express";
import { config } from "./config/config.js";
import cors from "cors";
import roomsRoutes from "./routes/rooms.route.js"

const app = express();
const port = config.port || 3000;

app.use(express.json());
app.use(cors());
app.use("/rooms", roomsRoutes);
app.use("/register", registerRoutes)
 

app.listen(port, ()=>{
    console.log("El servidor funciona en puerto 3000");
})