import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGO_URI;
console.log('MONGO_URI:', connectionString); // Debug statement

const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, { autoIndex: true });
        console.log('Connected to mongoDB database');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
    }
};

export default connectToDB;
