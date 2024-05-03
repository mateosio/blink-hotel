import express from "express";
import { login } from "../services/auth.service.js";

const router = express.Router();

router.post("/", async (req, res)=>{
    try {
        const {username, password} = req.body;
        const authorized = await login(username, password);
        res.status(200).json(authorized);
        //acá va la cookie.
    }
    catch (error) {
        req.status(409).json(error.message)
    }
})


export default router;