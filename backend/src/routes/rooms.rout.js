import express from "express";
import {getRooms, getRoomDetail} from "../services/rooms.service.js"

const router = express.Router();

router.get("/", async (req, res)=>{
   const rooms = await getRooms();
   res.status(200).json(rooms)
});

router.get("/:id", async (req, res)=>{
   const {id} = req.params;
   console.log(id);
   const room = await getRoomDetail(id);
   res.status(200).json(room);  
});

export default router;