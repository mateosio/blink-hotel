import express from "express";
import { login } from "../services/auth.service.js";

const router = express.Router();

router.post("/", async (req, res)=>{
    try {
        const {username, password} = req.body;
        const authorized = await login(username, password);
        const user = authorized.username;
        const accessToken = authorized.accessToken;
        const refreshToken = authorized.refreshToken;

        res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(201).json({user, accessToken});
    }
    catch (error) {
        let statusCode;

        switch(error.message){
            case "Usuario no registrado":
                statusCode = 401;
                break;
            
            case "Contraseña incorrecta":
                statusCode = 401;
                break;
            
            default:
            statusCode = 500;
        }
        res.status(statusCode).json({error: error.message})
    }
})


export default router;