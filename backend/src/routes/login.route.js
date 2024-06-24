import express from "express";
import { checkLogin, login } from "../services/auth.service.js";

const router = express.Router();


router.get("/", async (req, res)=>{
    try {
        console.log("entre a la ruta de ckecklogin");
        const cookies = req.cookies;
        const loggedIn = await checkLogin(cookies);
        
        const username = loggedIn.username;
        const accessToken = loggedIn.accessToken;
        
        res.status(200).json({username, accessToken});
    }
    catch (error) {
        let statusCode;
      
        if(error.message === "Usuario debe loguearse" || error.name === "TokenExpiredError"){
            statusCode = 401;
        }else{
            statusCode = 500;
        };      
        
        res.status(statusCode).json({"error": error})
    }
});

router.post("/", async (req, res)=>{
    try {
        const {user, pwd} = req.body;
        
        const cookies = req.cookies;
        const authorized = await login(user, pwd);
        
        const username = authorized.username;
        const accessToken = authorized.accessToken;
        const refreshToken = authorized.refreshToken;
        
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); 
        res.status(200).json({username, accessToken});
    }
    catch (error) {
        let statusCode;
      
        switch(error.message){
            case "Usuario logueado":
                statusCode = 409;
                break;            

            case "Usuario no registrado":
                statusCode = 401;
                break;
            
            case "Contraseña incorrecta":
                statusCode = 401;
                break;
            
            default:
            statusCode = 500;
        }
        
        res.status(statusCode).json({"error": error.message || "Error interno del servidor"})
    }
});


export default router;