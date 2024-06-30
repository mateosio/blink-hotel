import express from "express";
import { getRooms, getRoomDetail, updateReservation } from "../services/rooms.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rooms = await getRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const room = await getRoomDetail(id);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/:id/reservation", async (req, res) => {
  try {
    const { id } = req.params;
    const change = req.body;
    
    const update = await updateReservation(id, change, req);
    res.status(200).end();
  } catch (error) {
      if(error.message === "Dont have an access token"){
        res.status(401).json({message: "Unathorized"})
      }
      else if(error.type){
        res.sendStatus(403)
      } else{
        res.status(500).json({"message" : error.message})
      }
  }
});

export default router;
