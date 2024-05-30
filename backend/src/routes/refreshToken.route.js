import express from "express";
import {handleRefreshToken} from "../services/refreshToken.service.js";

const router = express.Router();

router.get("/", async (req, res)=>{
  try {
    const accessToken = await handleRefreshToken(req);
    res.status(200).json({accessToken});
    
  } catch (error) {
    res.sendStatus(401);
  }
});

