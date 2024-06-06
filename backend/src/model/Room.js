import moongose from "mongoose";

const Schema = moongose.Schema;

const roomReservationSchema = new Schema({
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    }
}, { _id: false });

const RoomSchema = new Schema({
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
        default: []
    },
});

export default Room = moongose.model("Room", RoomSchema);