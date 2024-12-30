import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './config/db.js';
dotenv.config();

connectToDB();

const app = express();
app.use(express.json());



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});