import express from "express";
import { config } from "./config/config.js";
import cors from "cors";
import hotelsRoutes from "./routes/hotels.rout.js"

const app = express();
const port = config.port || 3000;

app.use(express.json());
app.use(cors());
app.use(hotelsRoutes)
 

app.listen(port, ()=>{
    console.log("El servidor funciona en puerto 3000");
})