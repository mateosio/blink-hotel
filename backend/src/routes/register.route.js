import express from "express";
import { createUser } from "../services/register.service.js";


const router = express.Router();

router.post("/", async (req, res)=>{
    try {
        const {username, password} = req.body;
        const newUser = await createUser(username, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json(error.message);
    };
})

export default router;