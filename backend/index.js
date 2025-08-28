import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';

dotenv.config({
    path: "./.env"
});

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
})

app.use(express.json());

import authRouter from './routes/authRoute.js'

app.use('/api/auth', authRouter)

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log(error);
    });

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running now on port ${PORT}`);
})