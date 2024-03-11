import {MongoClient, ObjectId} from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db("hotel-blink")
const roomsCollection = db.collection("rooms");

export async function getRooms(){
    try{
        await client.connect();
        const rooms = await roomsCollection.find().toArray();
        console.log(rooms);
        return rooms;

    }
    catch(error){
        return error;
    }
};

export async function getRoomDetail(id){
    try{
        await client.connect();
        const roomId = ObjectId.createFromHexString(id);
        const roomDetail = await roomsCollection.findOne({ _id: roomId });       

        return roomDetail;
    }
    catch(error){
        return error;
    }

}