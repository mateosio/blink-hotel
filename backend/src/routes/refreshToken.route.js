import express from "express";
import {handleRefreshToken} from "../services/refreshToken.service.js";

const router = express.Router();

router.get("/", async (req, res)=>{
  try {
    const {newAccessToken, newRefreshToken} = await handleRefreshToken(req, res);
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({newAccessToken});
    
  } catch (error) {
    let statusCode;

        switch(error.message){
            case "Unauthorized":
                statusCode = 401;
                break;
            
            case "Forbidden":
                statusCode = 403;
                break;
            
            default:
            statusCode = 500;
        }
        res.status(statusCode).json({error: error.message})
    
  }
});

export default router;