import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomReservationSchema = new Schema({
    startDate: {
        type: String,
        
    },
    endDate: {
        type: String,
        
    }
}, { _id: false });

const roomSchema = new Schema({
    number: {
        type: Number,
    },
    type: {
        type: String,
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    roomReservations: {
        type: [roomReservationSchema],
    },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;