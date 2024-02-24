import express from "express";
import {getRooms} from "../services/rooms.service.js"

const router = express.Router();

router.get("/", async (req, res)=>{
   const rooms = await getRooms();
   console.log(rooms);
   res.status(200).json(rooms)
})

export default router;