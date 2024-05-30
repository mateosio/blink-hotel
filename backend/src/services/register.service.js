import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("hotel-blink");
const usersCollection = db.collection("users");
//await client.connect();

export const createUser = async (username, password)=>{
    await client.connect();
    const user = await findOne("username", username);
    if(!user){
        const hash = await bcrypt.hash(password, 10);
        const newUser = {
            username, 
            password: hash
        };
        await usersCollection.insertOne(newUser);
        return username;
    } else{
        throw new Error("Usuario existente");
    }

}

export const findOne = async (property, value)=>{
    //ver si puedo manejar la conexion previo a la declaración de las funciones para no conectarme dos veces. Top level await
    await client.connect();
    
    const query = {};
    query[property] = value;

    const user = await usersCollection.findOne(query)
    
    if(!user){
        return null; 
    }else{
        return user;
}
};