import dotenv from 'dotenv';
import mongoose from "mongoose";


export const connectDB = ()=>{
    //port from env file
    dotenv.config();
    //
    mongoose.connect(process.env.DATABASE_URL as string);

    const db = mongoose.connection;
    db.on('error', (error) => console.error('Connection error:', error));
    db.once('open', () => console.log('Connected to the Database.'));
}
