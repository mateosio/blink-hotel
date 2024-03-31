import {MongoClient, ObjectId} from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db("hotel-blink")
const roomsCollection = db.collection("rooms");

export async function getRooms(){
        await client.connect();
        const rooms = await roomsCollection.find().toArray();
        console.log(rooms);
        return rooms;
};
    

export async function getRoomDetail(id){
        await client.connect();
        const roomId = ObjectId.createFromHexString(id);
        const roomDetail = await roomsCollection.findOne({ _id: roomId });       

        return roomDetail;
};

export async function updateReservation(id, changes){
    await client.connect();
    const room = await getRoomDetail(id)
}