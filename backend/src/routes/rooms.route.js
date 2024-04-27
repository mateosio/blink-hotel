import express from "express";
import { getRooms, getRoomDetail, updateReservation } from "../services/rooms.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rooms = await getRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.send(error)
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Se ejecuto la petición al detalle de la habitación");
    const room = await getRoomDetail(id);
    res.status(200).json(room);
  } catch (error) {

  }
});

router.patch("/:id/reservation", async (req, res) => {
  try {
    const { id } = req.params;
    const change = req.body;
    const update = updateReservation(id, change);
    res.status(200).end();
  } catch (error) {

  }
});

export default router;
