import { MongoClient } from "mongodb";
import bcrypt from "bcrypt;"

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db("hotel-blink");
const usersCollection = db.collection("users");

export const createUser = async (username, password)=>{
    await client.connect();
    const user = await findOne(username);
    if(!user){
        const hash = await bcrypt.hash(password, 10);
        const newUser = {
            username, 
            password: hash
        };
        await usersCollection.insertOne(newUser);
        return newUser;
    } else{
        throw new Error("Usuario existente");
    }

}

export const findOne = async (username)=>{
    
    const user = await usersCollection.findOne({"username": username})
    console.log(user);
    if(!user){
        return null; 
    }else{
        return user;
}
};