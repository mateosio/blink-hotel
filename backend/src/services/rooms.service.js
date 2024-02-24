import {MongoClient} from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db("hotel-blink")
const roomsCollection = db.collection("rooms");

export async function getRooms(){
    try{
        await client.connect();
        const rooms = roomsCollection.find().toArray();
        console.log(rooms);
        return rooms;

    }
    catch(error){
        return error;
    }
   

}