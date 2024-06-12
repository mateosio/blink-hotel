import express from "express";
import { logout } from "../services/logout.service.js";

const router = express.Router();

router.get("/", async (req, res) =>{
    try {
        console.log("Entro al router de logout");
        const cookies = req.cookies;
        console.log("Cookies recibidas: ", cookies);

        const result = await logout(cookies);
        console.log("Se ejecutó la función logout del servicio y limpio las cookies");

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