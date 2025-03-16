import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const ConnectToMongoDB = async () => {
    try {
        const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
        await mongoose.connect(url, {
            maxPoolSize: 10, // Maintain up to 10 socket connections
            socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
        });
        console.log("Successfully connected to the Database")
    } catch (error) {
        console.log("Failed to connect to the Database. ", error);
    }
}