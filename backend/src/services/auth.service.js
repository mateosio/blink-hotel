import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findOne } from "./register.service";
import {config} from "../config/config.js"

export const login = async (username, password)=>{
    const user = await findOne(username);
    if(!user){
        throw new Error("Usuario no registrado");
    }else{
        const match = bcrypt.compare(password, user.password);
        if(!match){
            throw new Error("Contraseña incorrecta");
        }else{
            const payload = {
                sub: user.id
            };
                
            const token = jwt.sign(payload, config.jwtSecret​);
            return {user, token}
        }
    }
}