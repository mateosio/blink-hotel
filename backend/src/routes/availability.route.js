import express from "express";
import {getAvailables} from "../services/availability.service.js" 
const router = express.Router();

router.post("/", async (req, res)=>{
    try {
        const dates = req.body;
        const roomsAvailables = await getAvailables(dates);
        res.status(200).json(roomsAvailables)
    } catch (error) {
        res.status(400).json({error})
    }
})

export default router;