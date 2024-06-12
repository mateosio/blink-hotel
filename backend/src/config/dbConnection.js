import mongoose from "mongoose";
import { config } from "../config/config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoDB_Uri);
    } catch (err) {
        console.error(err);
    }
}

