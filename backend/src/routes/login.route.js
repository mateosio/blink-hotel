import express from "express";
import { login } from "../services/auth.service.js";

const router = express.Router();

router.post("/", async (req, res)=>{
    try {
        const {user, pwd} = req.body;
        
        const cookies = req.cookies;
        const authorized = await login(user, pwd, cookies);
        
        const username = authorized.username;
        const accessToken = authorized.accessToken;
        const refreshToken = authorized.refreshToken;
        // console.log(user);
        // console.log(accessToken);
        res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({username, accessToken});
    }
    catch (error) {
        let statusCode;
        
        switch(error.message){
            case "Usuario logueado":
                statusCode = 409            

            case "Usuario no registrado":
                statusCode = 401;
                break;
            
            case "Contraseña incorrecta":
                statusCode = 401;
                break;
            
            default:
            statusCode = 500;
        }
        
        res.status(statusCode).json({"error": error.message})
    }
})


export default router;