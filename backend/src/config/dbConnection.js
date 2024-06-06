import mongoose from "mongoose";
import { config } from "./config";

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoDB_Uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

