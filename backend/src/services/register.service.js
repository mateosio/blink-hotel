import User from "../model/User.js";
import bcrypt from "bcrypt";

export const createUser = async (username, password)=>{
    const user = await User.findOne({username});
    if(!user){
        const hash = await bcrypt.hash(password, 10);
        const newUser = {
            username, 
            password: hash
        };
        //Creo y guardo el nuevo usuario.
        await User.create(newUser);
        return username;
    } else{
        throw new Error("Usuario existente");
    }

}