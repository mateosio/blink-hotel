import express from "express";
import { logout } from "../services/logout.service";

const router = express.Router();

router.get("/", async (req, res) =>{
    try {
        const cookies = req.cookies;
        const result = await logout(cookies);
        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
        res.sendStatus(204);
        
    } catch (error) {
        if(error.message === "No content") res.status(204).json({error: error.message});
    }

})