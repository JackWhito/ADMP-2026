import express from 'express';
import dotenv from "dotenv";
const app = express();
dotenv.config()

import cors from "cors";

import authRoutes from './routes/auth.route.js';
import chatRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';
import {connectDB} from './lib/db.js';

const PORT = process.env.PORT

app.use(express.json());
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
))
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

app.get('/', (req, res) => {
    res.send('API is running....');
});

app.listen(PORT, () => {
    console.log('Server is running on port: '+ PORT);
    connectDB()
});