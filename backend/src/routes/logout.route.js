import express from "express";
import { logout } from "../services/logout.service.js";

const router = express.Router();

router.get("/", async (req, res) =>{
    try {
        const cookies = req.cookies;
        
        const result = await logout(cookies);
        
        res.clearCookie("refreshToken", { httpOnly: true, sameSite: 'None', secure: true });
        res.status(204).json({seEjecuto:"Se ejecutó el servicio y el route"});
        
    } catch (error) {
        if(error.message === "No content") res.status(204).json({error: error.message});
        if(error.message === "User not found"){
            res.clearCookie("refreshToken", { httpOnly: true, sameSite: 'None', secure: true });
            res.status(204).json({error: error.message});
        };
    }
});

export default router;